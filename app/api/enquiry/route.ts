import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { sendEmail, emailTemplates } from '@/lib/mail';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    const query: any = {};
    if (status) query.status = status;

    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Enquiry.countDocuments(query);

    return NextResponse.json({
      enquiries,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch enquiries', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
    });

    // Send confirmation email to user
    const emailTemplate = emailTemplates.enquiryReceived({ name, subject })
    await sendEmail({
      to: email,
      ...emailTemplate,
    })

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@medical.com',
      ...emailTemplates.adminNotification({
        type: 'Enquiry',
        details: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    })

    return NextResponse.json(
      { message: 'Enquiry submitted successfully', enquiry },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to submit enquiry', details: error.message },
      { status: 500 }
    );
  }
}
