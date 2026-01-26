import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Treatment from '@/models/Treatment';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: any = {};
    if (isActive) query.isActive = isActive === 'true';
    if (category) query.category = category;

    const treatments = await Treatment.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ treatments });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch treatments', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const treatment = await Treatment.create(body);

    return NextResponse.json(
      { message: 'Treatment created successfully', treatment },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create treatment', details: error.message },
      { status: 500 }
    );
  }
}
