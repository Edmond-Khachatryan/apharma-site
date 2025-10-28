# 🚀 Production Setup Guide

## 📋 Pre-deployment Checklist

### 1. Environment Variables

Создайте `.env.local` файл (скопируйте из `env.example.txt`):

```bash
cp env.example.txt .env.local
```

Установите переменные:

```env
# Admin Credentials
ADMIN_EMAIL="your_admin@example.com"
ADMIN_PASSWORD_HASH="your_bcrypt_hash_here"

# Генерация хэша пароля:
node -e "console.log(require('bcryptjs').hashSync('YourStrongPassword123!', 10))"
```

### 2. Database Setup

```bash
# Сгенерируйте Prisma клиент
npx prisma generate

# Запустите миграции
npx prisma migrate deploy

# Заполните базу начальными данными (опционально)
npm run db:seed
```

### 3. Security Checklist

✅ **Выполнено:**
- [x] HttpOnly cookies для авторизации
- [x] API routes для auth вместо localStorage
- [x] Bcrypt для хэширования паролей
- [x] Trim user input
- [x] Error handling без раскрытия деталей
- [x] Secure cookie flags (httpOnly, secure, sameSite)

⚠️ **Рекомендуется для production:**
- [ ] Добавить rate limiting на `/api/admin/auth`
- [ ] Использовать JWT вместо простых токенов
- [ ] Добавить CSRF защиту
- [ ] Настроить Content Security Policy (CSP)
- [ ] Добавить 2FA для админа
- [ ] Логирование попыток входа
- [ ] IP whitelist для админ-панели

### 4. Build & Deploy

```bash
# Production build
npm run build

# Запуск production сервера
npm run start
```

### 5. Environment-specific Settings

**Development:**
- Simple password check (`admin123`)
- Подробные ошибки в консоли
- Source maps включены

**Production:**
- Bcrypt password verification
- Generic error messages
- Source maps отключены
- HTTPS обязателен

## 🔐 Admin Access

**Development:**
- Email: `admin@demipharm.com`
- Password: `admin123`

**Production:**
- Используйте сильный пароль
- Сгенерируйте новый ADMIN_PASSWORD_HASH
- Измените ADMIN_EMAIL

## 📡 API Endpoints

### Admin Auth
- `POST /api/admin/auth` - Login
- `GET /api/admin/verify` - Verify session
- `POST /api/admin/logout` - Logout

### Public
- `GET /api/medicines` - Get medicines
- `GET /api/categories` - Get categories
- `GET /api/partners` - Get partners
- `GET /api/pharmacies` - Get pharmacies
- `GET /api/blog` - Get blog posts

## 🌍 Internationalization

Поддерживаемые локали:
- `ru` - Русский (по умолчанию)
- `en` - English
- `hy` - Հայերեն (Armenian)

URLs:
- `/` или `/ru` - Русский
- `/en` - Английский
- `/hy` - Армянский

**Админ-панель:**
- `/admin/login` - всегда на русском
- `/admin` - dashboard (требует авторизации)

## 🛠️ Troubleshooting

### Ошибка: "Неверные учетные данные"
1. Проверьте ADMIN_EMAIL в `.env.local`
2. Убедитесь что ADMIN_PASSWORD_HASH соответствует вашему паролю
3. В dev режиме используйте `admin123`

### Ошибка: "Ошибка соединения с сервером"
1. Проверьте что сервер запущен (`npm run dev` или `npm start`)
2. Проверьте network tab в DevTools
3. Проверьте логи сервера

### База данных не работает
```bash
# Сброс базы (ВНИМАНИЕ: удалит все данные!)
npx prisma migrate reset

# Повторная миграция
npx prisma migrate dev

# Заполнение данными
npm run db:seed
```

## 📝 Notes

- Админ-панель исключена из i18n middleware
- Cookie `admin_token` живёт 24 часа
- В production обязательно используйте HTTPS
- Регулярно обновляйте зависимости

## 🔗 Useful Commands

```bash
# Открыть Prisma Studio (GUI для БД)
npm run db:studio

# Проверить линтер
npm run lint

# Build проекта
npm run build

# Запустить production
npm run start
```

