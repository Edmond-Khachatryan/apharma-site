import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, address, phone, hours, latitude, longitude, image } = body;

    const pharmacy = await prisma.pharmacy.update({
      where: { id },
      data: {
        name,
        address,
        phone,
        hours,
        latitude,
        longitude,
        image,
      },
    });

    return NextResponse.json(pharmacy);
  } catch (error) {
    console.error('Error updating pharmacy:', error);
    return NextResponse.json({ error: 'Failed to update pharmacy' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.pharmacy.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Pharmacy deleted successfully' });
  } catch (error) {
    console.error('Error deleting pharmacy:', error);
    return NextResponse.json({ error: 'Failed to delete pharmacy' }, { status: 500 });
  }
}

