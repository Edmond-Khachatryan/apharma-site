'use client';

import { Link } from '@/i18n/routing';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg blur-sm opacity-40"></div>
                <div className="relative text-4xl font-black text-white bg-gradient-to-br from-primary-400 to-secondary-400 w-12 h-12 flex items-center justify-center rounded-lg shadow-lg">
                  A
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                  PHARMA
                </h3>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Healthier Tomorrow</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/medicines" className="hover:text-primary-400 transition-colors">
                  {t('nav.medicines')}
                </Link>
              </li>
              <li>
                <Link href="/pharmacies" className="hover:text-primary-400 transition-colors">
                  {t('nav.pharmacies')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/partners" className="hover:text-primary-400 transition-colors">
                  {t('nav.partners')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t('footer.delivery')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t('footer.returns')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contactInfo')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-1 text-primary-400" />
                <span>{t('footer.location')}</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-primary-400" />
                <a href="tel:+37491641221" className="hover:text-primary-400 transition-colors">
                  +374 91 641 221
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-primary-400" />
                <a href="mailto:info@apharma.com" className="hover:text-primary-400 transition-colors">
                  info@apharma.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 APHARMA. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}