import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начало заполнения базы данных...');

  // Создание админа
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@demipharm.com' },
    update: {},
    create: {
      email: 'admin@demipharm.com',
      password: hashedPassword,
      name: 'Администратор',
      role: 'admin',
    },
  });

  console.log('✅ Создан пользователь:', admin.email);

  // Создание категорий
  const categories = [
    { name: 'Офтальмология', slug: 'ophthalmology' },
    { name: 'Кардиология', slug: 'cardiology' },
    { name: 'Витамины', slug: 'vitamins' },
    { name: 'Иммунитет', slug: 'immunity' },
    { name: 'Обезболивающие', slug: 'pain' },
    { name: 'Антибиотики', slug: 'antibiotics' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('✅ Созданы категории');

  // Получаем созданные категории для дальнейшего использования
  const ophthalmology = await prisma.category.findUnique({ where: { slug: 'ophthalmology' } });
  const vitamins = await prisma.category.findUnique({ where: { slug: 'vitamins' } });
  const cardiology = await prisma.category.findUnique({ where: { slug: 'cardiology' } });
  const immunity = await prisma.category.findUnique({ where: { slug: 'immunity' } });

  // Создание примеров лекарств
  if (ophthalmology && vitamins && cardiology && immunity) {
    const medicines = [
      {
        name: 'Demoptic Plus',
        description: 'Капли для глаз от усталости и покраснения',
        price: '2500 AMD',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
        inStock: true,
        categoryId: ophthalmology.id,
      },
      {
        name: 'VitaComplex',
        description: 'Комплекс витаминов для укрепления иммунитета',
        price: '3200 AMD',
        image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
        inStock: true,
        categoryId: vitamins.id,
      },
      {
        name: 'CardioProtect',
        description: 'Поддержка сердечно-сосудистой системы',
        price: '4500 AMD',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
        inStock: true,
        categoryId: cardiology.id,
      },
      {
        name: 'ImmunoBoost',
        description: 'Укрепление защитных сил организма',
        price: '2800 AMD',
        image: 'https://images.unsplash.com/photo-1550572017-4a6e8d101efb?w=400&h=400&fit=crop',
        inStock: true,
        categoryId: immunity.id,
      },
    ];

    for (const medicine of medicines) {
      await prisma.medicine.create({ data: medicine });
    }

    console.log('✅ Созданы примеры лекарств');
  }

  console.log('🎉 База данных успешно заполнена!');
  console.log('\n📋 Данные для входа:');
  console.log('Email: admin@demipharm.com');
  console.log('Пароль: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

