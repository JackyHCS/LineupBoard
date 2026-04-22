import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
      <div className="max-w-md w-full bg-[#1a2332] rounded-lg p-8 border border-gray-800">
        <h1 className="text-2xl font-bold text-white mb-4">Authentication Error</h1>
        <p className="text-gray-400 mb-6">
          There was an error during authentication. Please try signing in again.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
