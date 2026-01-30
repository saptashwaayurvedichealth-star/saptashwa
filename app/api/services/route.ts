import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');

    const query: any = {};
    if (isActive) query.isActive = isActive === 'true';

    const services = await Service.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ services });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch services', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    console.log('Received service data:', body);

    // Validate required fields
    if (!body.title || !body.description || !body.image) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'Title, description, and image are required' },
        { status: 400 }
      );
    }

    const service = await Service.create(body);

    return NextResponse.json(
      { message: 'Service created successfully', service },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Service creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create service', details: error.message },
      { status: 500 }
    );
  }
}
