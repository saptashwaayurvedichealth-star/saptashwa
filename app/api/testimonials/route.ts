import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const isFeatured = searchParams.get('isFeatured');

    const query: any = {};
    if (isActive) query.isActive = isActive === 'true';
    if (isFeatured) query.isFeatured = isFeatured === 'true';

    const testimonials = await Testimonial.find(query)
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ testimonials });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const testimonial = await Testimonial.create(body);

    return NextResponse.json(
      { message: 'Testimonial created successfully', testimonial },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create testimonial', details: error.message },
      { status: 500 }
    );
  }
}
