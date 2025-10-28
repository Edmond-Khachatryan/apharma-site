'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslations } from 'next-intl';

export default function HeroSlider() {
  const t = useTranslations();
  
  const slides = [
    {
      id: 1,
      title: "EYES WITHOUT FATIGUE",
      subtitle: "AND REDNESS",
      description: "Demoptic Plus - профессиональное решение для здоровья глаз",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&h=600&fit=crop",
      products: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=300&fit=crop",
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=300&fit=crop",
      ]
    },
    {
      id: 2,
      title: "HEALTHY VISION",
      subtitle: "CLEAR SIGHT",
      description: "Передовые технологии для вашего зрения",
      image: "https://images.unsplash.com/photo-1559070169-a3077159ee16?w=1200&h=600&fit=crop",
      products: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=300&fit=crop",
      ]
    },
    {
      id: 3,
      title: "PROFESSIONAL CARE",
      subtitle: "FOR YOUR HEALTH",
      description: "Качественные медицинские препараты",
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&h=600&fit=crop",
      products: [
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=300&fit=crop",
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=300&fit=crop",
      ]
    },
  ];

  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[500px] md:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full w-full bg-gradient-to-r from-blue-100 to-purple-100"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(219, 234, 254, 0.9), rgba(233, 213, 255, 0.9)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="container mx-auto px-4 h-full">
                <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                  {/* Left Side - Text */}
                  <div className="text-left space-y-6">
                    <div className="inline-block">
                      <div className="bg-gray-800 text-white px-6 py-3 rounded-full text-xl md:text-2xl font-bold mb-4">
                        {slide.title}
                      </div>
                    </div>
                    <div className="inline-block">
                      <div className="bg-gray-800 text-white px-6 py-3 rounded-full text-xl md:text-2xl font-bold">
                        {slide.subtitle}
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg md:text-xl max-w-md">
                      {slide.description}
                    </p>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg">
                      {t('home.hero.learnMore')}
                    </button>
                  </div>

                  {/* Right Side - Product Images */}
                  <div className="flex items-center justify-center gap-4">
                    {slide.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-xl transform hover:scale-105 transition-transform"
                      >
                        <img
                          src={product}
                          alt={`Product ${idx + 1}`}
                          className="w-32 h-48 md:w-40 md:h-56 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}