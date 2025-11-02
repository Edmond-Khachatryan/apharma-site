import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const medicines = await prisma.medicine.findMany({
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
    const {
      name,
      nameEn,
      nameHy,
      description,
      descriptionEn,
      descriptionHy,
      image,
      inStock,
    } = body ?? {};

    const resolvedName = (name ?? nameEn ?? nameHy)?.toString().trim();
    const resolvedDescription = (description ?? descriptionEn ?? descriptionHy)?.toString().trim();

    if (!resolvedName || !resolvedDescription) {
      return NextResponse.json(
        { error: 'Название и описание обязательны (на любом языке)' },
        { status: 400 }
      );
    }

    const medicine = await prisma.medicine.create({
      data: {
        name: resolvedName,
        nameEn,
        nameHy,
        description: resolvedDescription,
        descriptionEn,
        descriptionHy,
        image: image || null,
        inStock: typeof inStock === 'boolean' ? inStock : true,
      },
    });

    return NextResponse.json(medicine, { status: 201 });
  } catch (error) {
    console.error('Error creating medicine:', error);
    return NextResponse.json({ error: 'Failed to create medicine' }, { status: 500 });
  }
}

