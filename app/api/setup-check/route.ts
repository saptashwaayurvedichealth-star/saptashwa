import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

export async function GET() {
  const status = {
    mongodb: false,
    cloudinary: false,
    email: false,
    nextauth: false,
    issues: [] as string[],
  }

  // Check MongoDB
  try {
    await connectDB()
    status.mongodb = true
  } catch (error) {
    status.issues.push('MongoDB connection failed. Check MONGODB_URI')
  }

  // Check Cloudinary
  if (
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  ) {
    status.cloudinary = true
  } else {
    status.issues.push('Cloudinary credentials missing. Check .env.local')
  }

  // Check Email
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD
  ) {
    status.email = true
  } else {
    status.issues.push('Email SMTP credentials missing. Check .env.local')
  }

  // Check NextAuth
  if (process.env.NEXTAUTH_URL && process.env.NEXTAUTH_SECRET) {
    status.nextauth = true
  } else {
    status.issues.push('NextAuth configuration missing. Check .env.local')
  }

  return NextResponse.json({
    ...status,
    allConfigured: status.mongodb && status.cloudinary && status.email && status.nextauth,
    message: status.issues.length === 0 
      ? 'All configurations are correct!' 
      : 'Some configurations are missing.',
  })
}
