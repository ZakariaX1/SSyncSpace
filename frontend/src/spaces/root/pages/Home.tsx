export default function Home() {
  return <>
    <div className="p-5 ml-8">
      <div className="flex">
        <div className="w-5/8">
          <h1 className="text-3xl pb-3">Welcome aboard captain!</h1>
          <div className="space-y-4">
            <p>
              It's easy to get lost in space, among the deadlines to meet, the seemingly endless amount of work that needs to be done and the many people you may need to work with and manage. That's where SSyncSpace comes in. SSyncSpace is here to help you stay SSynced up with your work and your crew, so you can turn on the gravity and keep your ships spinning.
            </p>
            <p>
              We offer a wide range of helpful facilities that can help you in your day to day challenges, from managing the events of a <a className="text-sky-400 underline" href="/spaces/discord">discord server</a> to keeping track of when it's time to pray your 5 daily prayers (<a className="text-sky-400 underline" href="/spaces/islam">see Islam space</a>). All you need to do is launch to the spaces you need, and your new Personal SSyncing Device (PSA) will show you the relevant tools to get the job done!
            </p>
            <p>
              We currently only offer the two facilities mentioned prior, but feel free to report new spaces you've discovered by sending a message to the captain! (If you have any suggestions of a new space, please email Zakaria at ...)
            </p>
            <p>
              I see you're still hanging around, if wish to learn more about this Ship, you can visit <a className="text-sky-400 underline" href="/spaces/ship-info">Ship Information</a>. If you're looking for Documentation, Statuses or open API's ready to be used, take a look in <a className="text-sky-400 underline" href="/spaces/system-status">System Status</a>. If you want to learn more about the captain and his work, refer to the <a className="text-sky-400 underline" href="/spaces/mission-logs">Mission Logs (Portfolio)</a>.
            </p>
            <p>LOREM IPSU_ [Typing effect as text appears? Maybe only an "easter egg" for those that hang around on the webpage for extra information and fun facts?]</p>
          </div>
        </div>
        <div className="w-3/8 text-center self-center rotate-60"> INSERT IMAGE OF A SHIP AND/OR LAUNCH POD HERE <br/> OR THE "MOTHERSHIP"/"SPACESTATION" </div>
      </div>
    </div>
    </>
}