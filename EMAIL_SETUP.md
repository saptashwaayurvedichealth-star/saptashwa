# Email Configuration Setup Guide

## Issue
The email sending feature is failing because SMTP environment variables are not configured.

## Solution

### Step 1: Create `.env.local` file
Create a `.env.local` file in the root of your project (copy from `.env.example`):

```bash
cp .env.example .env.local
```

### Step 2: Choose an Email Provider
You need to configure SMTP settings. Here are the most common options:

#### Option 1: Gmail (Free, Easy Setup)
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords" and generate a new password
4. Update `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-digit-app-password
SMTP_FROM=your-email@gmail.com
SMTP_FROM_NAME=Saptashwa
```

**Note**: Gmail has a daily sending limit of 500 emails/day.

#### Option 2: SendGrid (Recommended for Production)
1. Sign up at https://sendgrid.com (Free tier: 100 emails/day)
2. Create an API key
3. Update `.env.local`:

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
SMTP_FROM=verified-sender@yourdomain.com
SMTP_FROM_NAME=Saptashwa
```

#### Option 3: Mailgun
1. Sign up at https://www.mailgun.com
2. Get SMTP credentials from dashboard
3. Update `.env.local`:

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your_mailgun_smtp_user
SMTP_PASSWORD=your_mailgun_smtp_password
SMTP_FROM=noreply@yourdomain.com
SMTP_FROM_NAME=Saptashwa
```

### Step 3: Restart Your Development Server
After updating `.env.local`, restart your Next.js server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
pnpm dev
```

### Step 4: Test Email Sending
1. Go to the admin enquiries page
2. Try sending a reply email
3. Check the console for detailed error messages if it still fails

## Troubleshooting

### Still Getting Errors?
1. **Check environment variables are loaded**: Add this to your API route temporarily:
   ```typescript
   console.log('SMTP Config:', {
     host: process.env.SMTP_HOST,
     user: process.env.SMTP_USER,
     hasPassword: !!process.env.SMTP_PASSWORD
   })
   ```

2. **Test SMTP connection**: You can use the nodemailer verify method:
   ```typescript
   await transporter.verify()
   ```

3. **Common issues**:
   - Gmail: Make sure 2FA is enabled and you're using an App Password (not your regular password)
   - Firewall: Check if port 587 is blocked
   - Wrong credentials: Double-check username and password
   - From email not verified: Some providers require sender email verification

### Security Notes
- **Never commit `.env.local`** to git (it's already in `.gitignore`)
- Use strong, unique passwords
- For production, use a dedicated SMTP service like SendGrid or AWS SES
- Consider using environment variables in your hosting platform (Vercel, Netlify, etc.)

## What Was Fixed
1. **Better error handling**: The error message now shows the actual reason for failure
2. **Environment validation**: The code now checks for missing SMTP variables before attempting to send
3. **Detailed feedback**: Users will see which environment variables are missing
