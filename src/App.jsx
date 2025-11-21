import UploadAndAnalyze from './components/UploadAndAnalyze'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              FaceCare AI
            </h1>
            <p className="text-lg text-blue-200">
              Upload a clear face photo and get personalized skincare suggestions.
            </p>
          </div>

          <UploadAndAnalyze />
        </div>
      </div>
    </div>
  )
}

export default App
