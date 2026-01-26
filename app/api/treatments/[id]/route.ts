import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Treatment from '@/models/Treatment';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const treatment = await Treatment.findById(id);

    if (!treatment) {
      return NextResponse.json({ error: 'Treatment not found' }, { status: 404 });
    }

    return NextResponse.json({ treatment });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch treatment', details: error.message },
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

    const treatment = await Treatment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!treatment) {
      return NextResponse.json({ error: 'Treatment not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Treatment updated successfully', treatment });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update treatment', details: error.message },
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
    const treatment = await Treatment.findByIdAndDelete(id);

    if (!treatment) {
      return NextResponse.json({ error: 'Treatment not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Treatment deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete treatment', details: error.message },
      { status: 500 }
    );
  }
}
