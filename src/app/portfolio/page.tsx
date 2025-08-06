export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Project 1</h2>
          <p className="text-muted-foreground mb-4">
            Description of your first project...
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">
              React
            </span>
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">
              TypeScript
            </span>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Project 2</h2>
          <p className="text-muted-foreground mb-4">
            Description of your second project...
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">
              Next.js
            </span>
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">
              Prisma
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
