# 🐘 Настройка PostgreSQL базы данных на Neon.tech

## 📋 Пошаговая инструкция

### Шаг 1: Регистрация на Neon.tech

1. Откройте https://neon.tech
2. Нажмите **Sign Up** (или войдите через GitHub)
3. Подтвердите email
4. **✅ Бесплатный план включает:**
   - 3 GB хранилища
   - 100 часов compute time в месяц
   - Полностью достаточно для production сайта!

---

### Шаг 2: Создание проекта

1. После входа нажмите **Create Project**
2. Заполните данные:
   ```
   Project Name: apharma-db
   Region: Europe (или ближайший к вам)
   Postgres Version: 15 (по умолчанию)
   ```
3. Нажмите **Create Project**

---

### Шаг 3: Получение Connection String

После создания проекта вы увидите **Connection Details**:

```
postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require
```

**Пример:**
```
postgresql://neondb_owner:AbCdEfG12345@ep-cool-name-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
```

📋 **СКОПИРУЙТЕ ЭТУ СТРОКУ!** Она понадобится дальше.

---

### Шаг 4: Локальная настройка

Откройте `.env.local` (или создайте его) и добавьте:

```env
# PostgreSQL Database (Neon)
DATABASE_URL="postgresql://neondb_owner:AbCdEfG12345@ep-cool-name-12345.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Admin credentials
ADMIN_EMAIL=admin@apharma.com
ADMIN_PASSWORD_HASH=$2a$10$P8addT1uwkyGVC8yi9ebJ.v7dEsL4ms3S7bGvVMcg6kdUlEgbAlK6

# Environment
NODE_ENV=development
```

> ⚠️ **Замените** строку подключения на свою из Neon!

---

### Шаг 5: Создание миграций

```powershell
# 1. Создать первую миграцию
npx prisma migrate dev --name init

# 2. Заполнить базу тестовыми данными
npm run db:seed
```

**Вы должны увидеть:**
```
✅ Categories created: 4
✅ Medicines created: 12
✅ Partners created: 3
✅ Pharmacies created: 3
✅ Blog posts created: 3
```

---

### Шаг 6: Проверка локально

```powershell
npm run dev
```

Откройте:
- http://localhost:3000 - главная страница (должны быть лекарства)
- http://localhost:3000/admin/login - админ панель
  - Email: `admin@apharma.com`
  - Password: `admin123`

**Если видите данные - ВСЁ РАБОТАЕТ! ✅**

---

### Шаг 7: Настройка Netlify

1. Откройте https://app.netlify.com
2. Выберите ваш сайт
3. **Site settings** → **Environment variables**
4. Добавьте переменные:

```
DATABASE_URL = postgresql://[ваша строка из Neon]
ADMIN_EMAIL = admin@apharma.com
ADMIN_PASSWORD_HASH = $2a$10$P8addT1uwkyGVC8yi9ebJ.v7dEsL4ms3S7bGvVMcg6kdUlEgbAlK6
NODE_ENV = production
```

5. Нажмите **Save**

---

### Шаг 8: Deploy миграций в Production

```powershell
# Установите переменную окружения для production
$env:DATABASE_URL="postgresql://[ваша строка из Neon]"

# Запустите миграции
npx prisma migrate deploy

# Заполните production базу данными
npm run db:seed
```

---

### Шаг 9: Redeploy на Netlify

В Netlify:
1. **Deploys** → **Trigger deploy** → **Clear cache and deploy**
2. Подождите 2-3 минуты
3. Откройте ваш сайт!

---

## 🎉 Готово!

Ваш сайт теперь работает с полноценной PostgreSQL базой данных!

### 📊 Проверьте:

✅ **Главная страница:** лекарства отображаются  
✅ **Партнёры:** блок с партнёрами  
✅ **Аптеки:** карта аптек  
✅ **Блог:** статьи в блоге  
✅ **Админ панель:** управление всеми данными  

---

## 🔧 Полезные команды

### Просмотр базы данных
```powershell
npx prisma studio
```
Откроется веб-интерфейс для просмотра и редактирования данных.

### Сброс базы (ОСТОРОЖНО - удалит все данные!)
```powershell
npx prisma migrate reset
npm run db:seed
```

### Обновление Prisma Client
```powershell
npx prisma generate
```

---

## ❓ Проблемы?

### "Can't reach database server"
- Проверьте `DATABASE_URL` - скопирована ли полностью строка из Neon?
- Убедитесь что в конце есть `?sslmode=require`

### "Relation does not exist"
- Запустите миграции: `npx prisma migrate deploy`

### Netlify build fails
- Проверьте что `DATABASE_URL` добавлена в Environment variables
- Redeploy с **Clear cache**

---

## 💰 Стоимость

**БЕСПЛАТНО навсегда** для вашего сайта!

Neon Free Plan:
- ✅ 3 GB хранилища (хватит на тысячи лекарств)
- ✅ 100 часов compute в месяц (более чем достаточно)
- ✅ Автоматические бэкапы
- ✅ SSL соединение

---

Удачи! 🚀

