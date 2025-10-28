import { NextIntlClientProvider } from 'next-intl';
import '../globals.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load Russian messages for admin panel
  const messages = (await import(`../../messages/ru.json`)).default;
  
  return (
    <html lang="ru">
      <body>
        <NextIntlClientProvider messages={messages} locale="ru">
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

