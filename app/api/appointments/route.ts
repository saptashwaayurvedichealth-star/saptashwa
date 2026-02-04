import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import { sendEmail, emailTemplates } from '@/lib/mail';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    const query: any = {};
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(query);

    return NextResponse.json({
      appointments,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch appointments', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { patientName, email, phone, date, time, service, message } = body;

    if (!patientName || !email || !phone || !date || !time || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for double booking - same date and time
    const existingAppointment = await Appointment.findOne({
      date: new Date(date),
      time,
      status: { $nin: ['cancelled'] } // Don't count cancelled appointments
    });

    if (existingAppointment) {
      return NextResponse.json(
        { 
          error: 'Time slot already booked', 
          message: 'This time slot is already booked. Please select another time.'
        },
        { status: 409 } // 409 Conflict status code
      );
    }

    const appointment = await Appointment.create({
      patientName,
      email,
      phone,
      date: new Date(date),
      time,
      service,
      message: message || '',
      status: 'pending',
    });

    // Send confirmation email to patient
    const emailTemplate = emailTemplates.appointmentConfirmation({
      patientName,
      date: new Date(date).toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time,
      service,
    })
    
    await sendEmail({
      to: email,
      ...emailTemplate,
    })

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@medical.com',
      ...emailTemplates.adminNotification({
        type: 'Appointment',
        details: `
          <p><strong>Patient:</strong> ${patientName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Service:</strong> ${service}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        `,
      }),
    })

    // Prepare WhatsApp message
    const whatsappNumber = '918722920862'; // Your WhatsApp Business number
    const formattedDate = new Date(date).toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Create properly encoded WhatsApp message
    const whatsappMessage = 
      `*New Appointment Booked!*\n\n` +
      `*Patient Name:* ${patientName}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Date:* ${formattedDate}\n` +
      `*Time:* ${time}\n` +
      `*Service:* ${service}\n` +
      (message ? `*Message:* ${message}\n` : '') +
      `\n*Appointment ID:* ${appointment._id}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json(
      { 
        message: 'Appointment booked successfully', 
        appointment,
        whatsappUrl // Send WhatsApp URL to frontend
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create appointment', details: error.message },
      { status: 500 }
    );
  }
}
