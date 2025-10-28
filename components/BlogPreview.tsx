'use client';

import { Link } from '@/i18n/routing';
import { FiClock, FiUser } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export default function BlogPreview() {
  const t = useTranslations();
  const posts = [
    {
      id: 1,
      title: "Как правильно хранить лекарства дома",
      excerpt: "Узнайте о правильных условиях хранения различных видов препаратов для сохранения их эффективности.",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
      author: "Доктор Арутюнян",
      date: "15 Октября 2024",
      category: "Советы",
    },
    {
      id: 2,
      title: "Профилактика простудных заболеваний",
      excerpt: "Эффективные методы укрепления иммунитета и защиты от сезонных заболеваний.",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
      author: "Доктор Саркисян",
      date: "12 Октября 2024",
      category: "Здоровье",
    },
    {
      id: 3,
      title: "Витамины для здоровья глаз",
      excerpt: "Какие витамины и минералы необходимы для поддержания хорошего зрения.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      author: "Доктор Петросян",
      date: "10 Октября 2024",
      category: "Офтальмология",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-primary-600" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-primary-600" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            {t('blog.allArticles')}
          </Link>
        </div>
      </div>
    </section>
  );
}

