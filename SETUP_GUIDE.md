# Setup Guide

## 1. MongoDB Setup

### Option A: Local MongoDB
```bash
# Install MongoDB from https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod

# Your connection string
MONGODB_URI=mongodb://localhost:27017/medical_appointment
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medical_appointment
```

## 2. Cloudinary Setup (Image Uploads)

1. **Create Account**: https://cloudinary.com/users/register/free
2. **Get Credentials**: Go to Dashboard
3. **Create Upload Preset**:
   - Go to Settings → Upload
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Set Signing Mode to "Unsigned"
   - Set Folder to "medical-care"
   - Copy the preset name
4. **Update `.env.local`**:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

## 3. Email Setup (Gmail)

### Enable Gmail App Password:
1. Go to Google Account: https://myaccount.google.com/
2. Security → 2-Step Verification (enable if not enabled)
3. Security → App passwords
4. Select "Mail" and "Other (Custom name)"
5. Generate password
6. Copy the 16-character password

### Update `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM=your-email@gmail.com
SMTP_FROM_NAME=medical care  Admin
```

### Alternative Email Services:

#### SendGrid:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

#### Mailgun:
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your-mailgun-password
```

## 4. NextAuth Setup

Generate a secret key:
```bash
openssl rand -base64 32
```

Update `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret
```

## 5. Test Setup

### Test MongoDB Connection:
```bash
pnpm dev
# Check console for "MongoDB connected"
```

### Test Email:
- Create an appointment from the frontend
- Check if confirmation email is received

### Test Cloudinary:
- Go to admin panel
- Try uploading an image in Treatments/Services/Products
- Check if image uploads successfully

## 6. Seed Database (Optional)

Create sample admin user:
```bash
pnpm run seed
```

Default admin credentials:
- Email: admin@medical.com
- Password: admin123

## 7. Production Deployment

### Environment Variables:
Make sure all `.env.local` variables are added to your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- Railway: Project → Variables

### Update URLs:
```env
NEXTAUTH_URL=https://your-domain.com
```

## Troubleshooting

### MongoDB Connection Issues:
- Check if MongoDB service is running
- Verify connection string format
- Check firewall/network settings

### Email Not Sending:
- Verify SMTP credentials
- Check if app password is correct (for Gmail)
- Check spam folder
- Verify port 587 is not blocked

### Cloudinary Upload Issues:
- Verify upload preset is "unsigned"
- Check cloud name spelling
- Ensure API keys are correct

### Image Upload in Admin:
If Cloudinary upload widget doesn't work, you can still use direct image URLs:
- Upload images to any image hosting service
- Paste the URL in the image field

## Support

For issues or questions:
- Email: support@medical.com
- Documentation: https://docs.medical.com
