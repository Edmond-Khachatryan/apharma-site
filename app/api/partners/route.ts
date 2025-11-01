import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, nameEn, nameHy, description, descriptionEn, descriptionHy, website, logo } = body;

    const partner = await prisma.partner.create({
      data: {
        name,
        nameEn,
        nameHy,
        description,
        descriptionEn,
        descriptionHy,
        website,
        logo,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}

