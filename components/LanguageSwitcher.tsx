'use client';

import { FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

const languages = [
  { code: 'ru', name: 'Русский', flag: 'https://flagcdn.com/w40/ru.png', alt: 'RU' },
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png', alt: 'GB' },
  { code: 'hy', name: 'Հայերեն', flag: 'https://flagcdn.com/w40/am.png', alt: 'AM' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((l) => l.code === locale) || languages[0];

  const switchLanguage = (newLocale: string) => {
    // Use router.push from next-intl which handles locale switching
    // pathname is already without locale prefix
    router.push(pathname, {locale: newLocale});
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        aria-label={t('language') || 'Language'}
      >
        <img src={currentLanguage.flag} alt={currentLanguage.alt} className="w-6 h-4 object-cover rounded" />
        <span className="text-gray-700 font-medium hidden md:inline">{currentLanguage.name}</span>
        <FiChevronDown className="text-gray-500" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors ${
                  locale === lang.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                }`}
              >
                <img src={lang.flag} alt={lang.alt} className="w-6 h-4 object-cover rounded" />
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}