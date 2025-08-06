export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SSyncSpace</h1>
        <p className="text-xl text-gray-600 mb-8">
          A space where the SSundee Server can sync together and share ideas, stats and see future plans
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 border rounded-lg bg-white">
            <h2 className="text-2xl font-semibold mb-2">Portfolio</h2>
            <p className="text-gray-600 mb-4">
              Explore my work, projects, and professional journey
            </p>
            <a 
              href="/portfolio" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              View Portfolio
            </a>
          </div>
          
          <div className="p-6 border rounded-lg bg-white">
            <h2 className="text-2xl font-semibold mb-2">Discord Events</h2>
            <p className="text-gray-600 mb-4">
              Server events, suggestions, and community engagement
            </p>
            <a 
              href="/discord" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              View Events
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
