'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { 
  FiPackage, 
  FiUsers, 
  FiMapPin, 
  FiFileText, 
  FiPlus, 
  FiLogOut,
  FiArrowLeft,
  FiEye,
  FiTrendingUp,
  FiActivity,
  FiDollarSign,
  FiShoppingCart
} from 'react-icons/fi';

export default function AdminDashboard() {
  const t = useTranslations();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    medicines: 0,
    partners: 0,
    pharmacies: 0,
    blogPosts: 0
  });

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      const data = await response.json();
      
      if (data.authenticated) {
        setIsLoggedIn(true);
        fetchStats();
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [medicinesRes, partnersRes, pharmaciesRes, blogRes] = await Promise.all([
        fetch('/api/medicines'),
        fetch('/api/partners'),
        fetch('/api/pharmacies'),
        fetch('/api/blog')
      ]);
      
      const [medicines, partners, pharmacies, blog] = await Promise.all([
        medicinesRes.json(),
        partnersRes.json(),
        pharmaciesRes.json(),
        blogRes.json()
      ]);

      setStats({
        medicines: medicines.length,
        partners: partners.length,
        pharmacies: pharmacies.length,
        blogPosts: blog.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">{t('admin.loading')}</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    router.push('/admin/login');
    return null;
  }

  const menuItems = [
    {
      title: t('admin.medicines'),
      description: t('admin.manageMedicines'),
      icon: FiPackage,
      href: '/admin/medicines',
      color: 'bg-blue-500',
      count: stats.medicines,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: t('admin.partners'),
      description: t('admin.managePartners'),
      icon: FiUsers,
      href: '/admin/partners',
      color: 'bg-green-500',
      count: stats.partners,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: t('admin.pharmacies'),
      description: t('admin.managePharmacies'),
      icon: FiMapPin,
      href: '/admin/pharmacies',
      color: 'bg-purple-500',
      count: stats.pharmacies,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: t('admin.blog'),
      description: t('admin.manageBlog'),
      icon: FiFileText,
      href: '/admin/blog',
      color: 'bg-orange-500',
      count: stats.blogPosts,
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg blur-sm opacity-30"></div>
                  <div className="relative text-4xl font-black text-white bg-gradient-to-br from-primary-500 to-secondary-500 w-12 h-12 flex items-center justify-center rounded-lg shadow-md">
                    A
                  </div>
                </div>
                <div className="flex flex-col leading-tight">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    PHARMA
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">{t('admin.dashboard')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{t('admin.adminUser')}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut className="h-4 w-4 mr-2" />
                {t('admin.logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('admin.welcome')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('admin.subtitle')}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('admin.statsLabel.medicines')}</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.medicines}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FiPackage className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('admin.statsLabel.partners')}</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.partners}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FiUsers className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('admin.statsLabel.pharmacies')}</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pharmacies}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiMapPin className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('admin.statsLabel.articles')}</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.blogPosts}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <FiFileText className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                onClick={() => router.push(item.href)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-gray-900">
                      {item.count}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center text-sm text-primary-600 font-medium group-hover:text-primary-700">
                    <FiEye className="h-4 w-4 mr-2" />
                    {t('admin.goToManagement')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">{t('admin.quickActions')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => router.push('/admin/medicines/add')}
                className="flex items-center justify-center p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors backdrop-blur-sm"
              >
                <FiPlus className="h-5 w-5 mr-2" />
                {t('admin.addMedicine')}
              </button>
              <button 
                onClick={() => router.push('/admin/partners/add')}
                className="flex items-center justify-center p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors backdrop-blur-sm"
              >
                <FiPlus className="h-5 w-5 mr-2" />
                {t('admin.addPartner')}
              </button>
              <button 
                onClick={() => router.push('/admin/pharmacies/add')}
                className="flex items-center justify-center p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors backdrop-blur-sm"
              >
                <FiPlus className="h-5 w-5 mr-2" />
                {t('admin.addPharmacy')}
              </button>
              <button 
                onClick={() => router.push('/admin/blog/add')}
                className="flex items-center justify-center p-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors backdrop-blur-sm"
              >
                <FiPlus className="h-5 w-5 mr-2" />
                {t('admin.addArticle')}
              </button>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 {t('admin.usefulTips')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">✅ {t('admin.whatYouCanDo')}</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t('admin.canAddMedicines')}</li>
                  <li>• {t('admin.canManagePartners')}</li>
                  <li>• {t('admin.canUpdatePharmacies')}</li>
                  <li>• {t('admin.canPublishBlog')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">🚀 {t('admin.recommendations')}</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t('admin.uploadQualityImages')}</li>
                  <li>• {t('admin.fillAllFields')}</li>
                  <li>• {t('admin.updateRegularly')}</li>
                  <li>• {t('admin.checkPrices')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}