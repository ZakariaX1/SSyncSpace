import { Link } from "react-router-dom"

function RootNav() {
  return (
    <>
      <div className="flex items-center p-5">
        <Link to="/">
          <img src="/SSyncSpaceStationV5.png" alt="SSyncSpace Logo" className="h-30 w-auto" />
        </Link>
        <div className="ml-auto flex space-x-12 mr-4">
          <Link className="nav-link text-2xl text-center hover:text-sky-300" to="/spaces">Spaces</Link>
          <Link className="nav-link text-2xl text-center hover:text-sky-300" to="/mission-logs">Mission Logs</Link>
          <Link className="nav-link text-2xl text-center hover:text-sky-300" to="/ship-info">Ship Information</Link>
          <Link className="nav-link text-2xl text-center hover:text-sky-300" to="/system-status">System Status</Link>
        </div>
      </div>
      <div className="mt-5 border-t-2 border-gray-500 w-96/100 m-auto"></div>
    </>
  )
}

export default RootNav
