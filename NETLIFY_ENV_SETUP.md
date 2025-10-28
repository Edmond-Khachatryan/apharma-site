# 🔧 Настройка Environment Variables в Netlify

## 📍 Как найти Environment variables:

### Способ 1: Через меню
1. Откройте https://app.netlify.com
2. Выберите свой сайт **apharma-site**
3. Нажмите **"Site configuration"** (вверху)
4. Слева найдите **"Environment variables"**
5. Нажмите **"Add a variable"**

### Способ 2: Прямая ссылка
Откройте в браузере:
```
https://app.netlify.com/sites/apharma-site/configuration/env
```

---

## ✅ Переменные которые нужно добавить:

### 1. DATABASE_URL
```
Key: DATABASE_URL
Value: postgresql://neondb_owner:npg_U80gxvsqRdMw@ep-solitary-cherry-agomkbib-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### 2. ADMIN_EMAIL
```
Key: ADMIN_EMAIL
Value: admin@apharma.com
```

### 3. ADMIN_PASSWORD_HASH
```
Key: ADMIN_PASSWORD_HASH
Value: $2a$10$P8addT1uwkyGVC8yi9ebJ.v7dEsL4ms3S7bGvVMcg6kdUlEgbAlK6
```

### 4. NODE_ENV
```
Key: NODE_ENV
Value: production
```

---

## 🚀 После добавления переменных:

1. **Сохраните** (кнопка "Save" или "Add")
2. Перейдите на вкладку **"Deploys"**
3. Нажмите **"Trigger deploy"**
4. Выберите **"Clear cache and deploy"**

Подождите 2-3 минуты...

---

## ✅ Проверка:

После deploy откройте:
- https://apharma-site.netlify.app - главная (должны быть лекарства)
- https://apharma-site.netlify.app/admin/login - вход
- https://apharma-site.netlify.app/admin/medicines - управление лекарствами

**Email:** admin@apharma.com  
**Password:** admin123

---

Готово! 🎉

