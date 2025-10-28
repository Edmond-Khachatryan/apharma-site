import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, nameEn, nameHy, description, descriptionEn, descriptionHy, price, image, categoryId, inStock } = body;

    const medicine = await prisma.medicine.update({
      where: { id },
      data: {
        name,
        nameEn,
        nameHy,
        description,
        descriptionEn,
        descriptionHy,
        price,
        image,
        categoryId,
        inStock,
      },
    });

    return NextResponse.json(medicine);
  } catch (error) {
    console.error('Error updating medicine:', error);
    return NextResponse.json({ error: 'Failed to update medicine' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.medicine.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    return NextResponse.json({ error: 'Failed to delete medicine' }, { status: 500 });
  }
}

