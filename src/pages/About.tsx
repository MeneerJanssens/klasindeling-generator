import { Info } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8 text-center flex items-center justify-center gap-3">
          <Info className="w-10 h-10" />
          Over Klasindeling.be
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          
          <div className="prose prose-lg">
            <p className="text-gray-700 mb-6">
              Welkom bij Klasindeling.be - een verzameling handige tools voor leraren om klasbeheer 
              en natuurkunde-onderwijs eenvoudiger en interactiever te maken.
            </p>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-6 mb-4">
              Wat kan je doen?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                  📐 Klasindeling
                </h3>
                <p className="text-sm text-gray-600">
                  Genereer willekeurige zitindelingen, blokkeer plaatsen, voorkom dat lastige 
                  leerlingen naast elkaar zitten, en print of download als PDF.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                  👥 Groepjesmaker
                </h3>
                <p className="text-sm text-gray-600">
                  Maak willekeurige groepen met automatische verdeling en geslacht balans. 
                  Perfect voor projectwerk en groepsopdrachten.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                  🚗 EVRB Simulator
                </h3>
                <p className="text-sm text-gray-600">
                  Simuleer eenparig versnelde rechtlijnige beweging met realtime animatie en interactieve 
                  grafieken. Ideaal voor fysica lessen over beweging.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                  💧 Archimedes Simulator
                </h3>
                <p className="text-sm text-gray-600">
                  Demonstreer de wet van Archimedes met verschillende materialen en vloeistoffen. 
                  Visualiseer drijven en zinken met berekeningen.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-6 mb-4">
              Over de maker
            </h2>
            <p className="text-gray-700 mb-6">
              Deze tools zijn ontwikkeld door <strong>Dietrich Janssens</strong>, een leraar met een passie 
              voor technologie en onderwijs. Het doel is om klasbeheer en natuurkunde-onderwijs 
              eenvoudiger en interactiever te maken.
            </p>

            <h2 className="text-2xl font-semibold text-indigo-800 mt-6 mb-4">
              Steun het project
            </h2>
            <p className="text-gray-700 mb-4">
              Vind je deze tools handig? Help me om meer gratis educatieve tools te ontwikkelen!
            </p>
            
            <div className="flex justify-center my-6">
              <a 
                href='https://ko-fi.com/Z8Z01G7O8R' 
                target='_blank' 
                rel='noopener noreferrer'
              >
                <img 
                  src='https://ko-fi.com/img/githubbutton_sm.svg' 
                  alt='Steun me op Ko-fi'
                  className="hover:opacity-80 transition-opacity"
                />
              </a>
            </div>

            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-800">
                💡 <strong>Tip:</strong> Heb je suggesties voor nieuwe functies of tools? 
                Neem contact op via de contact pagina!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
