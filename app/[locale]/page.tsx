import HeroSlider from '@/components/HeroSlider';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutSection from '@/components/AboutSection';
import BlogPreview from '@/components/BlogPreview';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomeByLocale() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <FeaturedProducts />
        <AboutSection />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}


