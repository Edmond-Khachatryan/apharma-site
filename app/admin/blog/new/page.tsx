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
            <label className="block text-sm font-medium text-gray-700 mb-2">Изображение статьи</label>
            
            <div className="mb-3">
              <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600"><span className="font-semibold text-orange-600">Загрузить изображение</span></p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG до 5MB</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; if (file.size > 5 * 1024 * 1024) { alert('Файл слишком большой!'); return; } const reader = new FileReader(); reader.onloadend = () => { setFormData({ ...formData, image: reader.result as string }); }; reader.readAsDataURL(file); }} />
              </label>
            </div>

            <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">или</span></div></div>

            <input type="url" value={formData.image.startsWith('data:') ? '' : formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="mt-3 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="https://example.com/image.jpg" />
            
            {formData.image && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Предпросмотр:</p>
                <img src={formData.image} alt="Preview" className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200" onError={(e) => e.currentTarget.style.display = 'none'} />
                <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="mt-2 text-sm text-red-600">Удалить изображение</button>
              </div>
            )}
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

