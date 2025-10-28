import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4">Контакты</h1>
            <p className="text-center text-gray-600 mb-12">Свяжитесь с нами любым удобным способом</p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Телефон */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="text-3xl text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Телефон</h3>
                <a href="tel:+37491641221" className="text-blue-600 hover:underline">
                  +374 91 641 221
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="text-3xl text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <a href="mailto:info@apharma.am" className="text-green-600 hover:underline">
                  info@apharma.am
                </a>
              </div>

              {/* Адрес */}
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="text-3xl text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Адрес</h3>
                <p className="text-gray-700">
                  Ереван, Армения
                </p>
              </div>
            </div>

            {/* Форма обратной связи */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+374 XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение *</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ваше сообщение..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

