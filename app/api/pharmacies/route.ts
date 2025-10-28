import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const pharmacies = await prisma.pharmacy.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(pharmacies);
  } catch (error) {
    console.error('Error fetching pharmacies:', error);
    return NextResponse.json({ error: 'Failed to fetch pharmacies' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, phone, email, workingHours } = body;

    const pharmacy = await prisma.pharmacy.create({
      data: {
        name,
        address,
        phone,
        email,
        workingHours,
      },
    });

    return NextResponse.json(pharmacy, { status: 201 });
  } catch (error) {
    console.error('Error creating pharmacy:', error);
    return NextResponse.json({ error: 'Failed to create pharmacy' }, { status: 500 });
  }
}

