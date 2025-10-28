import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// В production используйте переменные окружения
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@apharma.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$9xHjQP5FZQfY7XxF2zKj9.KqB5kZxF5xF5xF5xF5xF5xF5xF5xF'; // admin123

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    // Проверка email
    if (email.trim() !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Неверные учетные данные' },
        { status: 401 }
      );
    }

    // Проверка пароля (в dev режиме используем простую проверку)
    const isValidPassword = process.env.NODE_ENV === 'production'
      ? await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
      : password === 'admin123';

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Неверные учетные данные' },
        { status: 401 }
      );
    }

    // Генерируем простой токен (в production используйте JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    const response = NextResponse.json(
      { success: true, token },
      { status: 200 }
    );

    // Устанавливаем HttpOnly cookie для безопасности
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 часа
    });

    return response;
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

