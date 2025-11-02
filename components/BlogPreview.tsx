'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { FiClock, FiUser } from 'react-icons/fi';
import { useTranslations, useLocale } from 'next-intl';

interface BlogPost {
  id: string;
  title: string;
  titleEn?: string | null;
  titleHy?: string | null;
  excerpt: string;
  excerptEn?: string | null;
  excerptHy?: string | null;
  image: string | null;
  author: string;
  category: string;
  readTime: string;
  published: boolean;
  createdAt: string;
}

export default function BlogPreview() {
  const t = useTranslations();
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const getLocalizedTitle = (post: BlogPost) => {
    if (locale === 'en' && post.titleEn) return post.titleEn;
    if (locale === 'hy' && post.titleHy) return post.titleHy;
    return post.title;
  };

  const getLocalizedExcerpt = (post: BlogPost) => {
    if (locale === 'en' && post.excerptEn) return post.excerptEn;
    if (locale === 'hy' && post.excerptHy) return post.excerptHy;
    return post.excerpt;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // Показываем только последние 3 опубликованные статьи
        setPosts(data.filter((post: BlogPost) => post.published).slice(0, 3));
      } else {
        console.error('Blog posts data is not an array:', data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl text-gray-600">Загрузка статей...</div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Не показываем секцию если нет статей
  }

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
              {post.image && (
                <div className="relative">
                  <img
                    src={post.image}
                    alt={getLocalizedTitle(post)}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {getLocalizedTitle(post)}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  {getLocalizedExcerpt(post)}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-primary-600" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-primary-600" />
                    <span>{post.readTime}</span>
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

