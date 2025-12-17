function Home() {
  return (
    <div className="p-5">
      <div className="h-40 flex items-center border-cyan-400 border">
        <img src="/SpaceStation.png" alt="SSyncSpace Logo" className="h-30 w-auto" />
        <div className="ml-auto flex space-x-5 mr-4">
          <div className="text-2xl text-center">Mission Logs<br /> (Portfolio)</div>
          <div className="text-2xl text-center">System Information<br /> (About Us)</div>
          <div className="text-2xl text-center">Ship Status<br /> (Status page)</div>
        </div>
      </div>
      <div className="flex border border-cyan-400">
        <div className="w-5/8 border border-cyan-400">
          <h1 className="text-4xl pb-3">Welcome aboard captain!</h1>
          <p> 
            It's easy to get lost in space, with all the work that needs to be done and all the deadlines to meet.<br />
            SSyncSpace is here to help you stay SSynced up with the central space station and your crew.<br />
            From Managing Discord event's [link] to keeping track of when you need to pray [link], this terminal should be your go-to when out on a mission.<br />
            To start SSyncing, all you need to do is launch to your destination and the terminal will present the tools you'll need for the job!
          </p>
        </div>
        <div className="w-3/8 border text-center"> INSERT IMAGE OF A SHIP AND/OR LAUNCH POD HERE </div>
      </div>
    </div>
  );
}

export default Home;