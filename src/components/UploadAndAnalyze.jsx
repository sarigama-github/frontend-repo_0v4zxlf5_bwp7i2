import { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function UploadAndAnalyze() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const onFileChange = (e) => {
    setFile(e.target.files?.[0] || null)
    setResult(null)
    setError('')
  }

  const analyze = async () => {
    if (!file) {
      setError('Please select a photo first.')
      return
    }
    setLoading(true)
    setError('')

    const fd = new FormData()
    fd.append('file', file)

    try {
      const res = await fetch(`${BACKEND}/api/analyze`, {
        method: 'POST',
        body: fd,
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError('Failed to analyze image. Please try a different photo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 mb-6">
        <h2 className="text-white text-xl font-semibold mb-4">Upload a face photo</h2>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="block w-full text-blue-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
        />
        <button
          onClick={analyze}
          disabled={loading}
          className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
      </div>

      {result && (
        <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="text-white text-lg font-semibold mb-2">Your skin insights</h3>
          <p className="text-blue-200 mb-2">Skin type: <span className="font-medium text-white">{result.skin_type}</span></p>
          {result.detected_issues?.length > 0 && (
            <div className="mb-3">
              <p className="text-blue-200 mb-1">Detected issues:</p>
              <ul className="list-disc list-inside text-blue-100">
                {result.detected_issues.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className="text-blue-200 mb-1">Recommendations:</p>
            <ul className="list-disc list-inside text-blue-100 space-y-1">
              {result.recommendations.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-xs text-blue-300/60 mt-6">This tool provides general skincare suggestions and is not a substitute for professional medical advice.</p>
    </div>
  )
}
