'use client';

import { FiAward, FiShield, FiTruck, FiUsers } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations();
  
  const features = [
    {
      icon: FiAward,
      titleKey: "aboutFeatures.quality.title",
      descriptionKey: "aboutFeatures.quality.description",
    },
    {
      icon: FiShield,
      titleKey: "aboutFeatures.safety.title",
      descriptionKey: "aboutFeatures.safety.description",
    },
    {
      icon: FiTruck,
      titleKey: "aboutFeatures.delivery.title",
      descriptionKey: "aboutFeatures.delivery.description",
    },
    {
      icon: FiUsers,
      titleKey: "aboutFeatures.professionalism.title",
      descriptionKey: "aboutFeatures.professionalism.description",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('home.about.title')}
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              {t('home.about.description1')}
            </p>
            <p className="text-gray-700 text-lg mb-6">
              {t('home.about.description2')}
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              {t('home.about.learnMore')}
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
              alt="Pharmacy"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}