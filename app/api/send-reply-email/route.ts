import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message, enquiryId } = body;

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Attempting to send email to:', to);
    console.log('SMTP configured:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASSWORD,
      from: process.env.SMTP_FROM
    });

    // Send email to the enquirer
    const emailResult = await sendEmail({
      to,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(to right, #059669, #14b8a6);
                color: white;
                padding: 30px 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #ffffff;
                padding: 30px 20px;
                border: 1px solid #e5e7eb;
              }
              .message {
                white-space: pre-wrap;
                background: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #059669;
              }
              .footer {
                background: #1f2937;
                color: #9ca3af;
                padding: 20px;
                text-align: center;
                font-size: 14px;
                border-radius: 0 0 8px 8px;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Saptashwa</div>
                <p style="margin: 0;">Response to Your Enquiry</p>
              </div>
              
              <div class="content">
                <h2 style="color: #059669; margin-top: 0;">Hello,</h2>
                
                <div class="message">
                  ${message.replace(/\n/g, '<br>')}
                </div>
                
                <p style="margin-top: 30px; color: #6b7280;">
                  If you have any further questions, please feel free to contact us.
                </p>
                
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 5px;">
                  <strong>Contact Us:</strong>
                </p>
                <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
                  📞 Phone: +91 97399 91801<br>
                  📧 Email: info@saptashwa.com<br>
                  🌐 Website: www.saptashwa.com
                </p>
              </div>
              
              <div class="footer">
                <p style="margin: 0;">© ${new Date().getFullYear()} Saptashwa - Your Health, Our Priority</p>
                <p style="margin: 10px 0 0 0;">Premium Ayurvedic Healthcare & Wellness</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: message,
    });

    if (!emailResult.success) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        emailId: emailResult.messageId 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}
