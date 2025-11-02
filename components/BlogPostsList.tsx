'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

interface BlogPost {
  id: string;
  title: string;
  titleEn?: string | null;
  titleHy?: string | null;
  excerpt: string;
  excerptEn?: string | null;
  excerptHy?: string | null;
  content: string;
  contentEn?: string | null;
  contentHy?: string | null;
  image: string | null;
  author: string;
  category: string;
  readTime: string;
  published: boolean;
  createdAt: string;
}

export default function BlogPostsList() {
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
        // Показываем только опубликованные статьи
        setPosts(data.filter((post: BlogPost) => post.published));
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
      <div className="text-center py-12">
        <div className="text-xl text-gray-600">Загрузка статей...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Пока нет статей в блоге</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.id}`}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
        >
          {post.image && (
            <div className="relative overflow-hidden h-48">
              <img
                src={post.image}
                alt={getLocalizedTitle(post)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6">
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {post.category}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {getLocalizedTitle(post)}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {getLocalizedExcerpt(post)}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>📝 {post.author}</span>
              <span>⏱️ {post.readTime}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

