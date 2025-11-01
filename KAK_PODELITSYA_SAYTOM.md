# 🌐 КАК ПОДЕЛИТЬСЯ САЙТОМ - БЫСТРАЯ ИНСТРУКЦИЯ

## 🚀 3 простых способа поделиться сайтом

---

## 📦 ВАРИАНТ 1: Vercel (БЕСПЛАТНО + ЛУЧШЕЕ РЕШЕНИЕ) ⭐

### Шаг 1: Push в GitHub

```bash
# Если еще не инициализирован git
git init
git add .
git commit -m "Medical site deployment"

# Создайте репозиторий на github.com
# Затем push:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Шаг 2: Deploy на Vercel

1. **Откройте** https://vercel.com
2. **Войдите** через GitHub
3. **Нажмите** "Add New Project"
4. **Выберите** ваш репозиторий
5. **Добавьте Environment Variables:**

```
DATABASE_URL=postgresql://neondb_owner:npg_U80gxvsqRdMw@ep-solitary-cherry-agomkbib-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
ADMIN_EMAIL=admin@demipharm.com
ADMIN_PASSWORD_HASH=$2a$10$P8addT1uwkyGVC8yi9ebJ.v7dEsL4ms3S7bGvVMcg6kdUlEgbAlK6
NODE_ENV=production
```

6. **Нажмите** "Deploy" → Готово! ✅

**Ваш сайт:** `https://your-project.vercel.app`

---

## 📦 ВАРИАНТ 2: Netlify (БЕСПЛАТНО)

### Шаг 1: Push в GitHub (см. выше)

### Шаг 2: Deploy на Netlify

1. **Откройте** https://netlify.com
2. **Войдите** через GitHub
3. **New site from Git** → выберите репозиторий
4. **Build settings** (уже настроено в netlify.toml):
   - Build command: `prisma generate && npm run build`
   - Publish directory: `.next`

5. **Environment variables** → добавьте те же переменные что для Vercel

6. **Deploy site** → Готово! ✅

**Ваш сайт:** `https://your-project.netlify.app`

---

## 📦 ВАРИАНТ 3: Локальный доступ через ngrok (для тестирования)

```bash
# Установите ngrok
# Скачайте: https://ngrok.com/download

# Запустите ваш сайт локально
npm run dev

# В другом терминале:
ngrok http 3000
```

**Вы получите временную ссылку:** `https://random-id.ngrok.io`

⚠️ **Временное решение** - ngrok бесплатно дает только 2 часа

---

## ⚙️ ДОБАВЛЕНИЕ БАЗЫ ДАННЫХ

Ваша база уже настроена на Neon PostgreSQL! Просто:

```bash
# Примените миграции
npx prisma migrate deploy

# Добавьте данные
npm run db:seed
```

Или через Vercel/Netlify CLI:

```bash
# Vercel
vercel env pull
npx prisma migrate deploy
npm run db:seed

# Netlify  
netlify env:set DATABASE_URL "your-connection-string"
netlify functions:invoke apply-migrations
```

---

## 🔐 ДАННЫЕ ДЛЯ ВХОДА

После deploy вы сможете зайти в админку:

**URL:** `https://your-site.com/admin/login`

**Email:** admin@demipharm.com  
**Пароль:** admin123

⚠️ **ВАЖНО:** Для production поменяйте пароль!

```bash
node -e "console.log(require('bcryptjs').hashSync('NewStrongPassword123!', 10))"
```

И замените `ADMIN_PASSWORD_HASH` в настройках Vercel/Netlify

---

## 🎯 КАКОЙ ВАРИАНТ ВЫБРАТЬ?

| Платформа | Сложность | Скорость | Бесплатно | Рекомендация |
|-----------|-----------|----------|-----------|--------------|
| **Vercel** | ⭐ Просто | ⚡ Быстро | ✅ Да | ⭐⭐⭐ ЛУЧШИЙ |
| **Netlify** | ⭐⭐ Средне | 🐢 Средне | ✅ Да | ⭐⭐ Хорошо |
| **ngrok** | ⭐ Просто | ⚡ Мгновенно | ⏱️ 2 ч | ⭐ Для теста |

**Выбирайте Vercel!** Он создан специально для Next.js

---

## ✅ ЧТО ПОЛУЧИТСЯ

После deploy ваш сайт будет:

- ✅ Доступен **24/7** по HTTPS
- ✅ Поддерживает **3 языка** (RU, EN, HY)
- ✅ Имеет **админ панель** для управления
- ✅ Автоматически **обновляется** при git push
- ✅ Бесплатный SSL сертификат
- ✅ CDN для быстрой загрузки
- ✅ Автоматические бэкапы БД

---

## 📱 ПОДЕЛИТЬСЯ С ДРУЗЬЯМИ

Просто отправьте ссылку:

```
https://your-site.vercel.app
```

Они смогут:
- ✅ Смотреть лекарства
- ✅ Искать по сайту
- ✅ Читать блог
- ✅ Смотреть аптеки на карте

---

## 🔄 ОБНОВЛЕНИЕ САЙТА

После любых изменений:

```bash
git add .
git commit -m "Updated medicines"
git push
```

Vercel/Netlify **автоматически** задеплоит за 2 минуты!

---

## 🆘 ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ

### Ошибка build
```bash
# Проверьте локально:
npm run build
```

### База данных не работает
- Проверьте `DATABASE_URL` в настройках Vercel/Netlify
- Убедитесь что Neon database активна

### Админка не открывается
- Проверьте cookies в браузере
- Очистите кэш и попробуйте снова

---

## 📞 ПОМОЩЬ

Если нужна помощь с deploy:
1. Проверьте `DEPLOYMENT_GUIDE.md` для подробной инструкции
2. Смотрите логи в Vercel/Netlify Dashboard
3. Проверьте документацию Vercel: https://vercel.com/docs

---

## 🎉 ГОТОВО!

Теперь у вас есть **полноценный рабочий сайт** который могут посмотреть все!

**Поделитесь ссылкой и наслаждайтесь!** 🚀

