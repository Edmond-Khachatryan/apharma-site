'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    category: '',
    readTime: '',
    published: false,
  });

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      if (!response.ok) router.push('/admin/login');
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Статья успешно добавлена!');
        router.push('/admin/blog');
      } else {
        alert('Ошибка при добавлении статьи');
      }
    } catch (error) {
      alert('Ошибка при добавлении статьи');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button onClick={() => router.push('/admin/blog')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <FiArrowLeft /> <span>Назад к списку</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Добавить статью</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок *</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Название статьи" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Краткое описание *</label>
            <textarea required rows={3} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Краткое описание статьи" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Полный текст *</label>
            <textarea required rows={10} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Полный текст статьи" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Автор *</label>
              <input type="text" required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Имя автора" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория *</label>
              <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Здоровье" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Время чтения *</label>
              <input type="text" required value={formData.readTime} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="5 мин" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL изображения</label>
            <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="https://example.com/image.jpg" />
            {formData.image && <img src={formData.image} alt="Preview" className="mt-3 w-48 h-32 object-cover rounded-lg" onError={(e) => e.currentTarget.style.display = 'none'} />}
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="published" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
            <label htmlFor="published" className="ml-3 text-sm font-medium text-gray-700">Опубликовать сразу</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg hover:shadow-lg disabled:opacity-50">
              <FiSave /> <span>{loading ? 'Сохранение...' : 'Сохранить'}</span>
            </button>
            <button type="button" onClick={() => router.push('/admin/blog')} className="px-8 py-3 border text-gray-700 rounded-lg hover:bg-gray-50">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}

