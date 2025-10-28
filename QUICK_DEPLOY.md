# ⚡ Быстрый Deploy - 5 минут!

## 🚀 Самый простой способ (Vercel)

### 1️⃣ Подготовка (1 минута)

```bash
# Проверьте что build работает
npm run build
```

Если ошибки — сообщите, исправим!

---

### 2️⃣ GitHub (2 минуты)

**Вариант A: Через GitHub Desktop (проще)**
1. Скачайте GitHub Desktop: https://desktop.github.com
2. File → Add Local Repository → выберите папку проекта
3. Publish repository → выберите имя: `apharma-site`
4. Publish!

**Вариант B: Через командную строку**
```powershell
# В папке проекта:
git init
git add .
git commit -m "Initial commit"

# Создайте репозиторий на github.com, затем:
git remote add origin https://github.com/YOUR_USERNAME/apharma-site.git
git push -u origin main
```

---

### 3️⃣ Vercel Deploy (2 минуты)

1. **Зайдите:** https://vercel.com/signup
2. **Sign up через GitHub** (кнопка GitHub)
3. **Import Git Repository:**
   - Нажмите "Import Project"
   - Выберите `apharma-site`
   - Нажмите "Import"

4. **Configure Project:**
   - Framework Preset: **Next.js** (автоопределится)
   - Root Directory: `./` (оставить как есть)
   - Нажмите **Deploy**

5. **Подождите 2-3 минуты** ☕

6. **Готово!** Получите ссылку: `https://apharma-site-xxx.vercel.app`

---

### 4️⃣ База данных (5 минут)

**Простой способ: Vercel Postgres (встроенная)**

1. В Vercel проекте → **Storage** → **Create Database**
2. Выберите **Postgres**
3. Region: **Frankfurt** (ближе к Армении)
4. Нажмите **Create**
5. **Connect** → скопируйте переменные
6. Откройте **Settings** → **Environment Variables**
7. Vercel автоматически добавит `POSTGRES_URL` и др.
8. Добавьте вручную:
   ```
   ADMIN_EMAIL = admin@apharma.com
   ADMIN_PASSWORD_HASH = (ваш хэш)
   ```

**ИЛИ используйте Neon (бесплатный PostgreSQL):**

1. https://neon.tech → Sign up
2. Create project: `apharma-db`
3. Скопируйте Connection String
4. В Vercel → Environment Variables добавьте:
   ```
   DATABASE_URL = postgresql://...
   ```

---

### 5️⃣ Настройка БД (3 минуты)

После добавления DATABASE_URL в Vercel:

1. **Redeploy проект:**
   - Vercel Dashboard → Deployments → три точки → Redeploy
   
2. **Запустите миграции** (один из способов):

**Способ A: Локально**
```bash
# В .env.local замените DATABASE_URL на production
DATABASE_URL="postgresql://..." npm run build
npx prisma migrate deploy
npm run db:seed
```

**Способ B: Через Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel env pull
npx prisma migrate deploy  
npm run db:seed
```

**Способ C: Через Prisma Studio**
```bash
npx prisma studio
# Добавьте данные вручную через GUI
```

---

## ✅ Проверка

Откройте:
- ✅ `https://your-site.vercel.app` - главная работает
- ✅ `https://your-site.vercel.app/en` - английский
- ✅ `https://your-site.vercel.app/admin/login` - админка
- ✅ Войдите и добавьте лекарство
- ✅ Вернитесь на главную — видите новое лекарство!

---

## 🔄 Обновления после деплоя

```bash
# 1. Делаете изменения в коде
# 2. Commit в Git:
git add .
git commit -m "Updated design"
git push

# 3. Vercel автоматически деплоит за 2 минуты!
```

---

## 💰 Стоимость

- **Vercel Hobby**: БЕСПЛАТНО (100GB bandwidth)
- **Vercel Postgres**: $0.27/месяц за 0.5GB (или бесплатно первые 30 дней)
- **Neon Postgres**: БЕСПЛАТНО навсегда (0.5GB)

**Рекомендация:** Neon (бесплатная БД) + Vercel Hobby (бесплатный хостинг) = $0/месяц! 🎉

---

## 🎯 Альтернативы (если Vercel не подходит)

### Railway.app
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```
Автоматически создаст БД! $5/месяц.

### Netlify
Аналогично Vercel, но нужна отдельная БД.

### VPS (DigitalOcean, Hetzner)
Для опытных пользователей. $5-20/месяц, полный контроль.

---

## ✨ Готово!

После deploy у вас будет:
- 🌍 Сайт доступен глобально
- 🔒 HTTPS из коробки
- 📱 Мобильная версия работает
- 🌐 Мультиязычность (ru/en/hy)
- 👨‍💼 Админ-панель для управления
- 💾 PostgreSQL база данных
- 🔄 Автоматические обновления при git push

**Ваш сайт в интернете за 10 минут!** 🚀

