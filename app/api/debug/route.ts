import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function GET() {
  try {
    const envCheck = {
      hasMongoUri: !!process.env.MONGODB_URI,
      mongoUriPreview: process.env.MONGODB_URI?.substring(0, 50) + '...',
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      hasAdminEmail: !!process.env.ADMIN_EMAIL,
      adminEmail: process.env.ADMIN_EMAIL,
    };

    console.log('Environment Check:', envCheck);

    // Try to connect and count admins
    await connectDB();
    const adminCount = await Admin.countDocuments();
    
    const dbCheck = {
      connected: true,
      adminCount,
    };

    console.log('Database Check:', dbCheck);

    if (adminCount > 0) {
      const admins = await Admin.find({}, 'email name role');
      return NextResponse.json({
        success: true,
        environment: envCheck,
        database: {
          ...dbCheck,
          admins: admins.map(a => ({ email: a.email, name: a.name, role: a.role })),
        },
      });
    }

    return NextResponse.json({
      success: true,
      environment: envCheck,
      database: dbCheck,
    });
  } catch (error: any) {
    console.error('Debug error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
