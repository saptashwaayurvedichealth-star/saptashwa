import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ enquiry });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch enquiry', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const enquiry = await Enquiry.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Enquiry updated successfully', enquiry });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update enquiry', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete enquiry', details: error.message },
      { status: 500 }
    );
  }
}
