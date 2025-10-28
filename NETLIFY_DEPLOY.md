# 🚀 Deploy на Netlify - Пошаговая инструкция

## ✅ Что уже сделано:
- ✅ Код загружен на GitHub: https://github.com/Edmond-Khachatryan/apharma-site
- ✅ Netlify конфигурация готова (`netlify.toml`)
- ✅ Build скрипты настроены

---

## 📦 Шаг 1: Создайте аккаунт на Netlify (2 минуты)

1. **Откройте:** https://app.netlify.com/signup
2. **Выберите:** "Sign up with GitHub"
3. **Авторизуйтесь** через GitHub
4. **Разрешите** Netlify доступ к репозиториям

---

## 🌐 Шаг 2: Import проекта (1 минута)

1. На главной странице Netlify нажмите **"Add new site"** → **"Import an existing project"**

2. Выберите **"Deploy with GitHub"**

3. Найдите репозиторий **`apharma-site`** 
   - Если не видите → нажмите "Configure Netlify on GitHub" и дайте доступ

4. Нажмите на **`apharma-site`**

---

## ⚙️ Шаг 3: Configure Build Settings (1 минута)

Netlify автоматически определит Next.js настройки:

**Build settings:**
- Base directory: (оставьте пустым)
- Build command: `npm run build`
- Publish directory: `.next`
- Functions directory: (auto)

✅ **Нажмите "Deploy apharma-site"**

⏳ **Подождите 3-5 минут** (первый deploy дольше)

---

## 🔑 Шаг 4: Настройка Environment Variables (2 минуты)

⚠️ **ВАЖНО!** Без этого админка не будет работать.

1. После deploy перейдите: **Site settings** → **Environment variables**

2. Нажмите **"Add a variable"** и добавьте:

### Обязательные переменные:

```env
Key: ADMIN_EMAIL
Value: admin@apharma.com

Key: ADMIN_PASSWORD_HASH
Value: $2b$10$P8addT1uwkyGVC8yi9ebJ.v7dEsL4ms3S7bGvVMcg6kdUlEgbAlK6

Key: NODE_ENV
Value: production
```

### Для базы данных (выберите один вариант):

**Вариант A: Neon PostgreSQL (БЕСПЛАТНО навсегда)**

1. Зайдите на https://neon.tech
2. Sign up через GitHub
3. Create project: `apharma-db`
4. Скопируйте **Connection string**
5. В Netlify добавьте:

```env
Key: DATABASE_URL
Value: postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require
```

**Вариант B: Supabase PostgreSQL (БЕСПЛАТНО)**

1. https://supabase.com → New project
2. Скопируйте **Database URL**
3. Добавьте как `DATABASE_URL`

**Вариант C: PlanetScale MySQL (БЕСПЛАТНО)**

1. https://planetscale.com
2. Create database
3. Get connection string
4. Добавьте как `DATABASE_URL`

3. **Сохраните** переменные

---

## 🔄 Шаг 5: Redeploy с переменными (1 минута)

После добавления environment variables:

1. Перейдите в **Deploys**
2. Нажмите **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Подождите 2-3 минуты

---

## 💾 Шаг 6: Настройка базы данных (3 минуты)

### Вариант A: Через Netlify CLI (рекомендуется)

```powershell
# Установите Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link к вашему сайту
netlify link

# Pull environment variables
netlify env:import .env.netlify

# Теперь можно запустить миграции локально с production DATABASE_URL:
# Скопируйте DATABASE_URL из Netlify в .env.local временно
npx prisma migrate deploy
npm run db:seed
```

### Вариант B: Через Prisma Studio (проще)

```powershell
# В .env.local временно установите production DATABASE_URL
DATABASE_URL="postgresql://..." npx prisma studio

# Добавьте данные через GUI:
# - Categories
# - Medicines
# - Partners
# - Pharmacies
# - BlogPosts
```

---

## ✨ Шаг 7: Проверка работы

Ваш сайт будет доступен на:
```
https://apharma-site.netlify.app
```

**Проверьте:**

1. **Главная страница:**
   - ✅ https://apharma-site.netlify.app
   - ✅ Логотип APHARMA отображается
   - ✅ Лекарства загружаются

2. **Мультиязычность:**
   - ✅ https://apharma-site.netlify.app/en - English
   - ✅ https://apharma-site.netlify.app/hy - Հայերեն
   - ✅ Переключатель языка работает

3. **Админ-панель:**
   - ✅ https://apharma-site.netlify.app/admin/login
   - ✅ Войдите: `admin@apharma.com` / `admin123`
   - ✅ Добавьте лекарство
   - ✅ Вернитесь на главную — видите новое лекарство!

---

## 🎨 Шаг 8: Custom Domain (опционально)

Если у вас есть домен (например `apharma.am`):

1. **Netlify Dashboard** → **Domain settings** → **Add custom domain**
2. Введите `apharma.am`
3. **Configure DNS** у вашего регистратора:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: apharma-site.netlify.app
```

4. Netlify автоматически выдаст **бесплатный SSL сертификат**!

---

## 🔄 Автоматические обновления

После первого deploy, каждый git push автоматически деплоится:

```powershell
# Делаете изменения в коде
git add .
git commit -m "Updated design"
git push

# Netlify автоматически деплоит за 2-3 минуты!
```

**Preview deployments:** Каждая ветка получает свой URL для тестирования!

---

## 🛠️ Troubleshooting

### Build fails на Netlify?

**Проблема:** "Error: Cannot find module 'prisma'"

**Решение:**
```toml
# В netlify.toml измените:
[build]
  command = "npm install && prisma generate && npm run build"
```

### База данных не подключается?

1. Проверьте `DATABASE_URL` в Environment Variables
2. Убедитесь что `?sslmode=require` в конце URL (для Neon/Supabase)
3. Проверьте что БД активна и доступна

### Админка показывает "Unauthorized"?

1. Проверьте `ADMIN_EMAIL` и `ADMIN_PASSWORD_HASH`
2. Проверьте что cookies включены в браузере
3. Попробуйте очистить cookies и войти снова

### Миграции не применяются?

```powershell
# Установите DATABASE_URL локально (временно)
$env:DATABASE_URL="postgresql://..."

# Запустите миграции
npx prisma migrate deploy

# Заполните данными
npm run db:seed
```

---

## 💰 Стоимость

**Netlify Starter:** БЕСПЛАТНО
- 100GB bandwidth/месяц
- 300 build минут/месяц
- Автоматический SSL
- Continuous deployment

**Neon PostgreSQL:** БЕСПЛАТНО
- 0.5GB хранилища
- 3 проекта
- Автоматические бэкапы

**ИТОГО: $0/месяц!** 🎉

---

## 📊 После deploy доступно:

- 📈 **Analytics** - встроенная статистика
- 🔍 **Logs** - real-time логи
- 🌍 **CDN** - глобальная доставка контента
- 🔒 **HTTPS** - автоматический SSL
- 🚀 **Fast** - edge functions

---

## 🎯 Следующие шаги:

1. ✅ Deploy на Netlify
2. ⚙️ Настроить Environment Variables
3. 💾 Подключить PostgreSQL (Neon)
4. 🗃️ Запустить миграции
5. 📝 Заполнить базу через админку
6. 🌐 Настроить custom domain (опционально)

**Готовы начать?** 🚀

