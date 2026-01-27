import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  // Check for required environment variables
  const requiredEnvVars = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'SMTP_FROM',
    'SMTP_FROM_NAME'
  ]
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    const error = new Error(`Missing SMTP configuration: ${missingVars.join(', ')}`)
    console.error('SMTP configuration error:', error.message)
    return { success: false, error }
  }

  try {
    console.log('Sending email via SMTP:', {
      to,
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      subject,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
    });

    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      text,
      html,
    })

    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('Failed to send email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      stack: error.stack,
    })
    return { success: false, error }
  }
}

// Email templates
export const emailTemplates = {
  appointmentConfirmation: (data: {
    patientName: string
    date: string
    time: string
    service: string
  }) => ({
    subject: 'Appointment Confirmation - medical care ',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏥 Appointment Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${data.patientName},</p>
              <p>Your appointment has been successfully confirmed. Here are the details:</p>
              
              <div class="details">
                <p><strong>📅 Date:</strong> ${data.date}</p>
                <p><strong>⏰ Time:</strong> ${data.time}</p>
                <p><strong>🏥 Service:</strong> ${data.service}</p>
              </div>
              
              <p>Please arrive 10 minutes before your scheduled appointment time.</p>
              <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
              
              <div class="footer">
                <p>medical care  - Your Health, Our Priority</p>
                <p>Contact: support@medical.com | Phone: +91 1234567890</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Dear ${data.patientName},\n\nYour appointment has been confirmed.\n\nDate: ${data.date}\nTime: ${data.time}\nService: ${data.service}\n\nThank you!`,
  }),

  enquiryReceived: (data: { name: string; subject: string }) => ({
    subject: 'We Received Your Enquiry - medical care ',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #3b82f6;">Thank You for Contacting Us!</h2>
            <p>Dear ${data.name},</p>
            <p>We have received your enquiry regarding: <strong>${data.subject}</strong></p>
            <p>Our team will review your message and get back to you within 24-48 hours.</p>
            <p>Thank you for choosing medical care !</p>
            <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 14px;">medical care  - Your Health, Our Priority</p>
          </div>
        </body>
      </html>
    `,
    text: `Dear ${data.name},\n\nWe have received your enquiry regarding: ${data.subject}\n\nOur team will get back to you soon.\n\nThank you!`,
  }),

  adminNotification: (data: { type: string; details: string }) => ({
    subject: `New ${data.type} Received - medical care  Admin`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>New ${data.type}</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
              ${data.details}
            </div>
            <p style="margin-top: 20px;">
              <a href="${process.env.NEXTAUTH_URL}/admin" 
                 style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">
                View in Admin Panel
              </a>
            </p>
          </div>
        </body>
      </html>
    `,
    text: `New ${data.type}\n\n${data.details}`,
  }),

  appointmentStatus: (data: {
    patientName: string
    date: string
    time: string
    service: string
    status: 'confirmed' | 'cancelled'
  }) => {
    const isConfirmed = data.status === 'confirmed'
    const title = isConfirmed ? 'Appointment Confirmed' : 'Appointment Cancelled'
    const highlightColor = isConfirmed ? '#16a34a' : '#dc2626'
    const note = isConfirmed
      ? 'We look forward to seeing you at the scheduled time.'
      : 'If this was a mistake, please contact us to reschedule.'

    return {
      subject: `${title} - ${data.service}`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: ${highlightColor}; color: white; padding: 18px 20px; border-radius: 10px 10px 0 0;">
                <h2 style="margin: 0;">${title}</h2>
                <p style="margin: 4px 0 0 0;">${data.service}</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 10px 10px;">
                <p style="margin: 0 0 12px 0;">Dear ${data.patientName},</p>
                <p style="margin: 0 0 12px 0;">This email is to let you know that your appointment has been <strong>${data.status}</strong>.</p>
                <div style="background: #f9fafb; padding: 14px; border-radius: 8px; border: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 6px 0;"><strong>Date:</strong> ${data.date}</p>
                  <p style="margin: 0 0 6px 0;"><strong>Time:</strong> ${data.time}</p>
                  <p style="margin: 0;"><strong>Service:</strong> ${data.service}</p>
                </div>
                <p style="margin: 16px 0 0 0; color: #4b5563;">${note}</p>
              </div>
              <p style="margin-top: 16px; font-size: 14px; color: #6b7280;">Thank you for choosing us.</p>
            </div>
          </body>
        </html>
      `,
      text: `Dear ${data.patientName},\n\nYour appointment has been ${data.status}.\n\nDate: ${data.date}\nTime: ${data.time}\nService: ${data.service}\n\n${note}`,
    }
  },
}
