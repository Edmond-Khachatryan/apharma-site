# 💊 APHARMA — Healthier Tomorrow

Modern Medical Web Application | Next.js 14, React, TypeScript, Tailwind CSS, Prisma, next-intl

A modern medical website with a full-featured admin panel, multilingual interface, and responsive design.  
Implemented authentication with NextAuth, content management via Prisma ORM, and RESTful API routes for all core operations.

## 🌟 Main Features

- ✅ **Admin Dashboard** — Full-featured admin panel for managing medicines, pharmacies, partners, and blog posts
- ✅ **Multilingual Support** — Russian, English, Armenian (next-intl)
- ✅ **Search System** — Search functionality across all content
- ✅ **Contact Form** — User contact and inquiries
- ✅ **Blog Section** — Medical news and articles
- ✅ **Fully Responsive** — Optimized for desktop and mobile devices
- ✅ **PostgreSQL Database** — Scalable database with Prisma ORM

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Setup database
cp env.example.txt .env.local
# Fill in DATABASE_URL and other variables

# Apply migrations
npx prisma migrate dev

# Seed database with sample data
npm run db:seed

# Start dev server
npm run dev
```

Open http://localhost:3000

## 🔐 Admin Panel

**URL:** http://localhost:3000/admin/login

**Email:** admin@demipharm.com  
**Password:** admin123

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on https://vercel.com
3. Add Environment Variables
4. Deploy!

**Detailed guide:** [KAK_PODELITSYA_SAYTOM.md](./KAK_PODELITSYA_SAYTOM.md)

## 📁 Project Structure

```
app/
├── [locale]/          # Multilingual pages (RU, EN, HY)
├── admin/             # Admin panel
├── api/               # API routes
components/            # React components
prisma/                # Database schema & migrations
public/                # Static files
```

## 🛠️ Technologies

- **Next.js 14** — React framework
- **TypeScript** — Type safety
- **PostgreSQL** — Database (Neon.tech)
- **Prisma** — ORM
- **Tailwind CSS** — Styling
- **next-intl** — Internationalization
- **Leaflet** — Maps
- **NextAuth** — Authentication

## 📚 Documentation

- [KAK_PODELITSYA_SAYTOM.md](./KAK_PODELITSYA_SAYTOM.md) — Deployment guide
- [CATEGORIES_REMOVED.md](./CATEGORIES_REMOVED.md) — Recent changes
- [PRICE_REMOVAL_SUMMARY.md](./PRICE_REMOVAL_SUMMARY.md) — Changelog
- [USER_GUIDE_RU.md](./USER_GUIDE_RU.md) — User guide
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) — Admin guide

## 📝 License

MIT

## 👥 Author

Created with ❤️ for medical information
