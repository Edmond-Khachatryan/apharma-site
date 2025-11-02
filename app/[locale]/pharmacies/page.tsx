import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PharmaciesList from '@/components/PharmaciesList';
import PharmaciesMap from '@/components/PharmaciesMap';

export default function PharmaciesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Наши аптеки</h1>
          
          {/* Карта с аптеками */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">Карта аптек</h2>
            <PharmaciesMap />
          </div>

          {/* Список аптек */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Все аптеки</h2>
            <PharmaciesList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

