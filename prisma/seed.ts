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

  // Создание примеров лекарств (без категорий)
  const medicines = [
    {
      name: 'Demoptic Plus',
      description: 'Капли для глаз от усталости и покраснения',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      inStock: true,
    },
    {
      name: 'VitaComplex',
      description: 'Комплекс витаминов для укрепления иммунитета',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
      inStock: true,
    },
    {
      name: 'CardioProtect',
      description: 'Поддержка сердечно-сосудистой системы',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
      inStock: true,
    },
    {
      name: 'ImmunoBoost',
      description: 'Укрепление защитных сил организма',
      image: 'https://images.unsplash.com/photo-1550572017-4a6e8d101efb?w=400&h=400&fit=crop',
      inStock: true,
    },
  ];

  for (const medicine of medicines) {
    await prisma.medicine.create({ data: medicine });
  }

  console.log('✅ Созданы примеры лекарств');

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

