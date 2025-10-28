'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

interface Medicine {
  id: string;
  name: string;
  nameEn?: string | null;
  nameHy?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionHy?: string | null;
  price: string;
  image: string | null;
  inStock: boolean;
  category: {
    name: string;
  };
}

export default function FeaturedProducts() {
  const t = useTranslations();
  const locale = useLocale();
  const [products, setProducts] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  // Функция для получения названия на нужном языке
  const getLocalizedName = (product: Medicine) => {
    if (locale === 'en' && product.nameEn) return product.nameEn;
    if (locale === 'hy' && product.nameHy) return product.nameHy;
    return product.name;
  };

  // Функция для получения описания на нужном языке
  const getLocalizedDescription = (product: Medicine) => {
    if (locale === 'en' && product.descriptionEn) return product.descriptionEn;
    if (locale === 'hy' && product.descriptionHy) return product.descriptionHy;
    return product.description;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/medicines');
      const data = await response.json();
      // Показываем только первые 4 товара в наличии
      setProducts(data.filter((m: Medicine) => m.inStock).slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl text-gray-600">{t('home.featured.loading')}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('home.featured.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('home.featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category.name}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {getLocalizedName(product)}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {getLocalizedDescription(product)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    {product.price}
                  </span>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    {t('home.featured.buy')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/medicines"
            className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            {t('home.featured.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}