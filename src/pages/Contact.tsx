import { Mail, Github, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8 text-center flex items-center justify-center gap-3 w-full">
          <Mail className="w-10 h-10" />
          Contact
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          
          <div className="space-y-6">
            <p className="text-gray-700">
              Heb je vragen, suggesties of feedback? Neem gerust contact op!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Email */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-indigo-900">Contactformulier</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Vul het contactformulier in met je vraag of feedback.
                </p>
                <a
                  href="https://forms.office.com/e/4Se4X6yLZR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Open Contactformulier →
                </a>
              </div>

              {/* GitHub */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Github className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-indigo-900">GitHub</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Bekijk de broncode of meld een bug.
                </p>
                <a
                  href="https://github.com/MeneerJanssens/klasindeling-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  GitHub Repository
                </a>
              </div>

              {/* Feedback */}
              <div className="bg-indigo-50 p-6 rounded-lg md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-indigo-900">Feedback</h3>
                </div>
                <p className="text-gray-700">
                  Je feedback helpt me om deze tool te verbeteren. Laat me weten wat 
                  je graag zou willen zien of wat beter kan!
                </p>
              </div>
            </div>

            {/* Ko-fi Support */}
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Steun dit project
              </h3>
              <p className="text-gray-700 mb-4">
                Als je deze tool waardevol vindt en me wilt steunen bij het ontwikkelen 
                van meer handige tools voor leraren, overweeg dan een donatie via Ko-fi.
              </p>
              <a 
                href='https://ko-fi.com/Z8Z01G7O8R' 
                target='_blank' 
                rel='noopener noreferrer'
              >
                <img 
                  src='https://ko-fi.com/img/githubbutton_sm.svg' 
                  alt='Support me on Ko-fi' 
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
