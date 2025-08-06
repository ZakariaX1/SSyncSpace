export default function DiscordPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Discord Events</h1>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-l-primary pl-4">
                  <h3 className="font-semibold">Community Game Night</h3>
                  <p className="text-sm text-muted-foreground">Saturday, 8 PM EST</p>
                  <p className="text-sm mt-1">Join us for a fun evening of games and community interaction!</p>
                </div>
                <div className="border-l-4 border-l-secondary pl-4">
                  <h3 className="font-semibold">Build Competition</h3>
                  <p className="text-sm text-muted-foreground">Next Sunday, 3 PM EST</p>
                  <p className="text-sm mt-1">Show off your building skills in our weekly competition.</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Past Events</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-l-muted pl-4">
                  <h3 className="font-semibold">Holiday Celebration</h3>
                  <p className="text-sm text-muted-foreground">Last completed • 45 participants</p>
                  <p className="text-sm mt-1">Great turnout for our holiday event!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Suggest an Event</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Have an idea for an event? Staff members can submit suggestions here.
            </p>
            <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary/90 transition-colors">
              Submit Suggestion
            </button>
          </div>
          
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Event Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Events:</span>
                <span className="text-sm font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Month:</span>
                <span className="text-sm font-semibold">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg. Participants:</span>
                <span className="text-sm font-semibold">32</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
