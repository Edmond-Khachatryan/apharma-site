# 🚀 Deployment Guide - APHARMA

## Deployment на Vercel + Neon PostgreSQL (БЕСПЛАТНО!)

### 📋 Что вам понадобится:
1. GitHub аккаунт
2. Vercel аккаунт (бесплатный)
3. Neon аккаунт (бесплатный PostgreSQL)

---

## Шаг 1: Подготовка проекта

### 1.1 Обновите package.json для production build:

```bash
npm install --save-dev @vercel/node
```

### 1.2 Создайте .gitignore (если нет):

```
node_modules/
.next/
.env
.env.local
.env.production
prisma/dev.db
prisma/dev.db-journal
.vercel
```

---

## Шаг 2: Настройка PostgreSQL базы данных

### 2.1 Зарегистрируйтесь на Neon.tech:
1. Перейдите на https://neon.tech
2. Sign up бесплатно через GitHub
3. Создайте новый проект: **apharma-db**
4. Скопируйте **Connection String** (будет вида: `postgresql://user:pass@ep-xxx.neon.tech/neondb`)

### 2.2 Обновите Prisma schema для PostgreSQL:

Откройте `prisma/schema.prisma` и замените:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

На:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 2.3 Создайте новую миграцию для PostgreSQL:

```bash
# Удалите старые SQLite миграции
rm -rf prisma/migrations

# Создайте новую миграцию для PostgreSQL
# Сначала установите DATABASE_URL в .env.local:
# DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb"

npx prisma migrate dev --name init
npx prisma generate
```

---

## Шаг 3: Push в GitHub

### 3.1 Инициализируйте Git (если ещё не сделано):

```bash
git init
git add .
git commit -m "Initial commit - APHARMA medical site"
```

### 3.2 Создайте репозиторий на GitHub:
1. Перейдите на https://github.com/new
2. Название: `apharma-medical-site`
3. Приватный или публичный (на ваш выбор)
4. НЕ добавляйте README, .gitignore (у нас уже есть)

### 3.3 Push в GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/apharma-medical-site.git
git branch -M main
git push -u origin main
```

---

## Шаг 4: Deploy на Vercel

### 4.1 Импортируйте проект:
1. Перейдите на https://vercel.com
2. Sign up через GitHub
3. Нажмите **"Import Project"**
4. Выберите ваш репозиторий `apharma-medical-site`

### 4.2 Настройте Environment Variables:

В Vercel Settings → Environment Variables добавьте:

```env
# Database
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb"
DIRECT_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb"

# Admin Credentials
ADMIN_EMAIL="admin@apharma.com"
ADMIN_PASSWORD_HASH="$2b$10$P8addT1uwkyGVC8yi9ebJ.v7dEsL4ms3S7bGvVMcg6kdUlEgbAlK6"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="https://your-app-name.vercel.app"

# Environment
NODE_ENV="production"
```

**ВАЖНО:** Для production сгенерируйте новый пароль!

```bash
node -e "console.log(require('bcryptjs').hashSync('YourStrongPassword123!', 10))"
```

### 4.3 Настройте Build Command:

Vercel автоматически определит Next.js. Но убедитесь:
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 4.4 Deploy!

Нажмите **"Deploy"** и подождите ~2-3 минуты.

---

## Шаг 5: Заполнение базы данных

### 5.1 После первого деплоя, запустите миграции:

В Vercel Dashboard → Settings → General → найдите **Deployment Protection**.

Затем выполните:

```bash
# Установите DATABASE_URL из Neon
export DATABASE_URL="postgresql://..."

# Запустите миграции
npx prisma migrate deploy

# Заполните начальными данными
npx prisma db seed
```

**ИЛИ** используйте Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel env pull .env.production
npx prisma migrate deploy
npm run db:seed
```

---

## Шаг 6: Проверка работы

### 6.1 Откройте ваш сайт:
```
https://your-app-name.vercel.app
```

### 6.2 Проверьте локали:
- `https://your-app.vercel.app` - Русский
- `https://your-app.vercel.app/en` - English
- `https://your-app.vercel.app/hy` - Հայերեն

### 6.3 Войдите в админку:
```
https://your-app.vercel.app/admin/login

Email: admin@apharma.com
Password: (ваш новый сильный пароль)
```

### 6.4 Добавьте лекарства через админку:
1. Войдите в `/admin`
2. Нажмите "Добавить препарат"
3. Заполните данные
4. Сохраните
5. Вернитесь на главную — новое лекарство появится!

---

## 🔄 Автоматические обновления

После настройки, каждый раз когда вы делаете `git push`:

```bash
git add .
git commit -m "Added new medicines"
git push
```

Vercel **автоматически задеплоит** изменения за ~2 минуты! ✨

---

## 🔒 Security Checklist для Production

- [ ] Смените ADMIN_EMAIL на реальный
- [ ] Создайте сильный пароль и новый ADMIN_PASSWORD_HASH
- [ ] Сгенерируйте случайный NEXTAUTH_SECRET (32+ символа)
- [ ] Используйте PostgreSQL вместо SQLite
- [ ] Включите Vercel Authentication для админки (опционально)
- [ ] Настройте custom domain (если есть)
- [ ] Включите Vercel Analytics

---

## 💾 Бэкапы базы данных

### Автоматические бэкапы Neon:
- Neon делает автоматические снэпшоты каждый день
- Можно восстановить через Dashboard

### Ручной бэкап:

```bash
# Export данных
npx prisma db pull

# Или полный дамп через Neon Dashboard
```

---

## 🌍 Custom Domain (опционально)

### Если у вас есть домен (например apharma.am):

1. В Vercel Dashboard → Settings → Domains
2. Добавьте `apharma.am` и `www.apharma.am`
3. Настройте DNS записи у регистратора домена:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

4. Подождите 24-48 часов для распространения DNS
5. Vercel автоматически выдаст SSL сертификат

---

## 📊 Мониторинг

### Vercel Analytics (бесплатно):
1. Settings → Analytics → Enable
2. Просмотр трафика, производительности
3. Core Web Vitals

### Логи ошибок:
- Vercel Dashboard → Deployments → Logs
- Real-time logs для debugging

---

## 🛠️ Troubleshooting

### Ошибка: "Build failed"
```bash
# Локально проверьте build:
npm run build

# Если ошибка, проверьте логи Vercel
```

### Ошибка: "Database connection failed"
```bash
# Проверьте DATABASE_URL в Vercel Environment Variables
# Убедитесь что Neon database активна
```

### Админка не работает:
```bash
# Проверьте cookies в браузере (должны быть включены)
# Проверьте ADMIN_EMAIL и ADMIN_PASSWORD_HASH в Vercel env
```

### Миграции не применились:
```bash
# Используйте Vercel CLI для выполнения миграций:
vercel login
vercel link
npx prisma migrate deploy
```

---

## 💡 Полезные команды

```bash
# Локальный build тест
npm run build && npm run start

# Проверка production bundle
npm run build

# Vercel preview deploy
vercel

# Vercel production deploy  
vercel --prod

# Просмотр логов
vercel logs

# Открыть deployed site
vercel open
```

---

## 📝 Контрольный список перед deploy:

- [ ] `package.json` содержит все зависимости
- [ ] `.env.local` НЕ в git (добавлен в .gitignore)
- [ ] Prisma schema обновлён для PostgreSQL
- [ ] Миграции созданы
- [ ] Build проходит без ошибок локально
- [ ] Все environment variables настроены в Vercel
- [ ] ADMIN_PASSWORD_HASH обновлён для production
- [ ] Seed данные готовы (или загружены вручную)

---

## 🎉 После успешного deploy:

Ваш сайт будет доступен 24/7 по адресу:
```
https://apharma-medical-site.vercel.app
```

**Админка:**
```
https://apharma-medical-site.vercel.app/admin/login
```

**Все изменения через админку сохраняются в PostgreSQL и видны сразу!** 🎯

---

## 📞 Поддержка

Если возникнут проблемы:
1. Проверьте логи в Vercel Dashboard
2. Проверьте документацию: https://vercel.com/docs
3. Neon docs: https://neon.tech/docs

