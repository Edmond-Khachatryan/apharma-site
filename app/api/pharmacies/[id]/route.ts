import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

