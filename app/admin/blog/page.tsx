'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FiArrowLeft, FiPlus, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
  author: string;
  category: string;
  readTime: string;
  published: boolean;
  createdAt: string;
}

export default function BlogPage() {
  const router = useRouter();
  const t = useTranslations('admin');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      if (!response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эту статью?')) return;
    
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FiArrowLeft />
            <span>Назад к панели</span>
          </button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('blog')}
              </h1>
              <p className="text-gray-600 mt-2">
                Управление статьями блога
              </p>
            </div>
            
            <button
              onClick={() => alert('Функция добавления статьи будет доступна после настройки БД')}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              <FiPlus />
              <span>Добавить статью</span>
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              Пока нет статей в блоге
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6 p-6">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          post.published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {post.published ? <FiEye /> : <FiEyeOff />}
                          {post.published ? 'Опубликовано' : 'Черновик'}
                        </span>
                        
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <p className="text-sm text-gray-400 mt-2">
                      Создано: {new Date(post.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

