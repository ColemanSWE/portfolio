import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="bg-yellow-400 border-2 border-black p-8 max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4 font-mono">404</h1>
          <h2 className="text-xl font-bold mb-4 font-mono">PAGE NOT FOUND</h2>
          <p className="mb-6 font-mono">THE REQUESTED PAGE DOES NOT EXIST</p>
          <Link 
            href="/" 
            className="bg-blue-500 text-white px-6 py-3 font-bold hover:bg-blue-600 transition-colors inline-block"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  )
} 