import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import { sendEmail, emailTemplates } from '@/lib/mail';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ appointment });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch appointment', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const appointment = await Appointment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Appointment updated successfully',
      appointment,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update appointment', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Appointment deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete appointment', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Use confirmed or cancelled.' },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    console.log('Sending appointment status email to:', appointment.email);
    console.log('SMTP Configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASSWORD,
      from: process.env.SMTP_FROM,
      fromName: process.env.SMTP_FROM_NAME,
    });

    const emailPayload = emailTemplates.appointmentStatus({
      patientName: appointment.patientName,
      date: new Date(appointment.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: appointment.time,
      service: appointment.service,
      status,
    });

    const result = await sendEmail({
      to: appointment.email,
      ...emailPayload,
    });

    if (!result.success) {
      const errorMessage = (result.error as any)?.message || String(result.error);
      console.error('Email sending failed:', errorMessage);
      return NextResponse.json(
        { 
          error: 'Failed to send email', 
          details: errorMessage,
          code: (result.error as any)?.code
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Appointment status email error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: error.message || String(error),
        code: error.code
      },
      { status: 500 }
    );
  }
}
