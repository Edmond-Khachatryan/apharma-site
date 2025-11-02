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
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale="ru">
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

