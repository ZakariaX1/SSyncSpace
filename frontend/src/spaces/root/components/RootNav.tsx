function RootNav() {
  return (
    <>
      <div className="flex items-center p-5">
        <img src="/SpaceStation.png" alt="SSyncSpace Logo" className="h-30 w-auto" />
        <div className="ml-auto flex space-x-12 mr-4">
          <a className="nav-link text-2xl text-center hover:text-sky-300" href="/spaces">Spaces</a>
          <a className="nav-link text-2xl text-center hover:text-sky-300" href="/mission-logs">Mission Logs</a>
          <a className="nav-link text-2xl text-center hover:text-sky-300" href="/ship-info">Ship Information</a>
          <a className="nav-link text-2xl text-center hover:text-sky-300" href="/system-status">System Status</a>
        </div>
      </div>
      <div className="mt-5 border-t-2 border-gray-500 w-96/100 m-auto"></div>
    </>
  )
}

export default RootNav
