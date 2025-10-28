import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const medicines = await prisma.medicine.findMany({
      skip,
      take: limit,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(medicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return NextResponse.json({ error: 'Failed to fetch medicines' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, nameEn, nameHy, description, descriptionEn, descriptionHy, image, inStock, categoryId } = body;

    const medicine = await prisma.medicine.create({
      data: {
        name,
        nameEn,
        nameHy,
        description,
        descriptionEn,
        descriptionHy,
        image,
        inStock,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(medicine, { status: 201 });
  } catch (error) {
    console.error('Error creating medicine:', error);
    return NextResponse.json({ error: 'Failed to create medicine' }, { status: 500 });
  }
}

