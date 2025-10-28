# PowerShell скрипт для подготовки к деплою
Write-Host "🚀 APHARMA - Подготовка к деплою" -ForegroundColor Green
Write-Host ""

# 1. Проверка build
Write-Host "📦 Шаг 1: Проверка build..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Исправьте ошибки и запустите скрипт снова." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build успешен!" -ForegroundColor Green
Write-Host ""

# 2. Git инициализация
Write-Host "📝 Шаг 2: Инициализация Git..." -ForegroundColor Cyan

if (Test-Path .git) {
    Write-Host "✅ Git уже инициализирован" -ForegroundColor Green
} else {
    git init
    Write-Host "✅ Git инициализирован" -ForegroundColor Green
}

# 3. Добавление файлов
Write-Host ""
Write-Host "📁 Шаг 3: Добавление файлов в Git..." -ForegroundColor Cyan
git add .
git commit -m "Production ready - APHARMA medical site"

Write-Host "✅ Файлы добавлены в Git" -ForegroundColor Green
Write-Host ""

# 4. Инструкции для GitHub
Write-Host "🌐 Шаг 4: Следующие шаги:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Создайте репозиторий на GitHub:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "2️⃣  Затем выполните:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/apharma-site.git" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "3️⃣  Deploy на Vercel:" -ForegroundColor White
Write-Host "   https://vercel.com/new" -ForegroundColor Cyan
Write-Host "   - Import your GitHub repository" -ForegroundColor Gray
Write-Host "   - Deploy!" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  Добавьте Environment Variables в Vercel:" -ForegroundColor White
Write-Host "   ADMIN_EMAIL=admin@apharma.com" -ForegroundColor Gray
Write-Host "   ADMIN_PASSWORD_HASH=(сгенерируйте новый!)" -ForegroundColor Gray
Write-Host "   DATABASE_URL=(от Neon или Vercel Postgres)" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Полная инструкция: QUICK_DEPLOY.md" -ForegroundColor Green
Write-Host ""
Write-Host "✨ Готово к деплою!" -ForegroundColor Green

