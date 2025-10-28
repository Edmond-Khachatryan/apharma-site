import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Создаём базовые категории
    const categories = [
      { name: 'Антибиотики', slug: 'antibiotics' },
      { name: 'Обезболивающие', slug: 'painkillers' },
      { name: 'Витамины', slug: 'vitamins' },
      { name: 'Сердечно-сосудистые', slug: 'cardiovascular' },
      { name: 'Желудочно-кишечные', slug: 'gastrointestinal' },
      { name: 'Противовоспалительные', slug: 'anti-inflammatory' },
      { name: 'Противовирусные', slug: 'antiviral' },
      { name: 'Другие', slug: 'other' },
    ];

    // Удаляем существующие категории
    await prisma.category.deleteMany();

    // Создаём новые
    for (const category of categories) {
      await prisma.category.create({
        data: category,
      });
    }

    return NextResponse.json({ message: 'Categories seeded successfully' });
  } catch (error) {
    console.error('Error seeding categories:', error);
    return NextResponse.json({ error: 'Failed to seed categories' }, { status: 500 });
  }
}
