'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { FiSearch, FiPhone, FiMenu, FiX } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative text-5xl font-black text-white bg-gradient-to-br from-primary-500 to-secondary-500 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg transform group-hover:scale-105 transition-transform">
                  A
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  PHARMA
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                  Healthier Tomorrow
                </span>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl w-full">
              <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-sm">
                <input
                  type="text"
                  placeholder={t('common.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-6 py-2.5 outline-none text-gray-700"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 transition-colors"
                >
                  <FiSearch className="text-white text-xl" />
                </button>
              </div>
            </form>

            {/* Right Side - Language & Phone */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              <a
                href="tel:+37491641221"
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <FiPhone className="text-primary-600 text-xl" />
                <span className="font-medium hidden lg:inline">+374 91 641 221</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between md:justify-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-8 py-4">
              <li>
                <Link
                  href="/"
                  className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-gray-700 font-semibold hover:text-primary-600 transition-colors"
                >
                  {t('nav.partners')}
                </Link>
              </li>
              <li>
                <Link
                  href="/medicines"
                  className="text-gray-700 font-semibold hover:text-primary-600 transition-colors"
                >
                  {t('nav.medicines')}
                </Link>
              </li>
              <li>
                <Link
                  href="/pharmacies"
                  className="text-gray-700 font-semibold hover:text-primary-600 transition-colors"
                >
                  {t('nav.pharmacies')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-700 font-semibold hover:text-primary-600 transition-colors"
                >
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 font-semibold hover:text-primary-600 transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 font-semibold hover:text-primary-600 transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <ul className="md:hidden pb-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="block py-2 text-primary-600 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="block py-2 text-gray-700 font-semibold hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.partners')}
                </Link>
              </li>
              <li>
                <Link
                  href="/medicines"
                  className="block py-2 text-gray-700 font-semibold hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.medicines')}
                </Link>
              </li>
              <li>
                <Link
                  href="/pharmacies"
                  className="block py-2 text-gray-700 font-semibold hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.pharmacies')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block py-2 text-gray-700 font-semibold hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 text-gray-700 font-semibold hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 text-gray-700 font-semibold hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}