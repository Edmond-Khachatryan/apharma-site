import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiCheckCircle, FiAward, FiUsers, FiTrendingUp } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">О компании APHARMA</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Ваш надёжный партнёр в мире здоровья и фармацевтики
            </p>
          </div>
        </section>

        {/* О нас */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Кто мы</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>APHARMA</strong> — современная фармацевтическая компания, которая занимается распространением качественных лекарственных препаратов и медицинских изделий на территории Армении.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Мы работаем с ведущими производителями фармацевтической продукции со всего мира, чтобы предоставить нашим клиентам доступ к эффективным и безопасным лекарствам.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Наша миссия — сделать здоровье доступным для каждого, обеспечивая высочайшее качество продукции и профессиональный сервис.
              </p>
            </div>
          </div>
        </section>

        {/* Наши преимущества */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Качество */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="text-4xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Качество</h3>
                <p className="text-gray-600">
                  Все препараты проходят строгий контроль качества и имеют необходимые сертификаты
                </p>
              </div>

              {/* Опыт */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="text-4xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Опыт</h3>
                <p className="text-gray-600">
                  Многолетний опыт работы на фармацевтическом рынке Армении
                </p>
              </div>

              {/* Партнёры */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="text-4xl text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Партнёры</h3>
                <p className="text-gray-600">
                  Сотрудничество с ведущими мировыми производителями
                </p>
              </div>

              {/* Развитие */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrendingUp className="text-4xl text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Развитие</h3>
                <p className="text-gray-600">
                  Постоянное расширение ассортимента и улучшение сервиса
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Наши ценности */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-600">🏥 Забота о здоровье</h3>
                  <p className="text-gray-700">
                    Здоровье наших клиентов — наш главный приоритет. Мы тщательно отбираем продукцию и работаем только с проверенными поставщиками.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-2 text-green-600">✅ Честность и прозрачность</h3>
                  <p className="text-gray-700">
                    Мы предоставляем только достоверную информацию о препаратах и всегда готовы ответить на вопросы наших партнёров.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-600">🤝 Профессионализм</h3>
                  <p className="text-gray-700">
                    Наша команда состоит из квалифицированных специалистов с глубокими знаниями в области фармацевтики.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-2 text-orange-600">🚀 Инновации</h3>
                  <p className="text-gray-700">
                    Мы следим за новейшими разработками в фармацевтической индустрии и стремимся предоставлять самые современные решения.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Хотите узнать больше?</h2>
            <p className="text-xl mb-8">Свяжитесь с нами, и мы ответим на все ваши вопросы</p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Связаться с нами
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

