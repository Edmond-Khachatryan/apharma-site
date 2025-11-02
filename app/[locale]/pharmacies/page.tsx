import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PharmaciesList from '@/components/PharmaciesList';

export default function PharmaciesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Наши аптеки</h1>
          <PharmaciesList />
        </div>
      </main>
      <Footer />
    </>
  );
}

