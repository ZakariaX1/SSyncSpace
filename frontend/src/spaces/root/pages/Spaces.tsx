import { useState } from 'react';
import RootNav from '../components/RootNav';

const SpaceType = {
  Maintainance: "Maintainance",
  Accessible: "Accessible",
  Inaccessible: "Inaccessible",
  Offline: "Offline",
  Updating: "Updating",
} as const;

type SpaceCardContent = {
  title: string,
  subdomain: string,
  status: (typeof SpaceType)[keyof typeof SpaceType],
  statusSince: string | null, // TODO: change to date(-time)
  spaceDiscoveredAt: string,
  routeModifiedAt: string | null,
  data: {
    description: string,
    previewImageURL: string | null,
    relatedLinks: {
      name: string,
      linkTo: string | null,
      logoURL: string | null,
    }[] | null,
    tools: {
      name: string,
      description: string,
      linkTo: string | null
    }[] | null
  }
}

type SpaceCardProps = SpaceCardContent & {
  onSelect: () => void,
  isSelected: boolean,
};

function SpaceCard({
  title,
  status,
  statusSince,
  spaceDiscoveredAt,
  routeModifiedAt,
  onSelect,
  isSelected,
}: SpaceCardProps) {
  return (<>
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left p-3 mb-3 transition-colors ${
        isSelected ? 'bg-blue-900/30' : 'hover:bg-gray-800'
      }`}
    >
      <div className="flex justify-between">
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-sm text-right">
          <div className="uppercase tracking-wide">{status}</div>
          {statusSince && <div className="text-xs text-gray-400">since {statusSince}</div>}
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-300">Discovered: {spaceDiscoveredAt}</div>
      <div className="text-xs text-gray-300">Route updated: {routeModifiedAt ?? "-"}</div>
    </button>
    <div className='border-t-2 border-gray-500'></div>
  </>);
}

function SpaceInformation({ space }: { space: SpaceCardContent | null }) {
  if (!space) return <div className="text-gray-400">Select a space to see details.</div>;

  const { data } = space;

  return (<>
      <div className="flex justify-between items-start gap-3">
        <div className="mb-2 text-2xl font-semibold">{space.title}</div>
          <div className="text-sm text-right">
            <div className="uppercase tracking-wide">{space.status}</div>
            {space.statusSince && <div className="text-xs text-gray-400">since {space.statusSince}</div>}
          </div>
      </div>

      <div className='flex'>
        <div className='mr-10'>
          <div className="text-sm text-gray-300">- Space Discovered: {space.spaceDiscoveredAt}</div>
          <div className="text-sm text-gray-300">- Route modified: {space.routeModifiedAt ?? '-'}</div>
          
          <div className='my-4'>
            <button
              type="button"
              onClick={() => {
                const rootHost = import.meta.env.VITE_ROOT_WEBURL ?? window.location.host;
                const launchUrl = `${window.location.protocol}//${space.subdomain}.${rootHost}`;
                window.open(launchUrl, '_blank', 'noopener,noreferrer');
              }}
              className="px-4 py-2 text-sm font-medium rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Launch {space.title}
            </button>
          </div>
        </div>
        

        {data.relatedLinks && data.relatedLinks.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-3 items-center">
              {data.relatedLinks.map((link, idx) => {
                const content = link.logoURL 
                ? (
                  <img
                    src={link.logoURL}
                    alt={link.name}
                    className="h-10 w-10 rounded-full border border-gray-600 bg-gray-800 p-1.5"
                    loading="lazy"
                  />
                ) : (
                  <div className="p-1.5 rounded bg-gray-700 border border-gray-600 flex items-center justify-center text-xs text-gray-200">
                    {link.name}
                  </div>
                );

                if (!link.linkTo) {
                  return (
                    <div key={idx} className="opacity-70" title={link.name}>
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={idx}
                    href={link.linkTo}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:scale-105"
                    title={link.name}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {data.previewImageURL ? (
          <div className='ml-auto'>
            <div className="text-xs text-gray-400 mb-1">Preview</div>
            <img src={data.previewImageURL} alt={`${space.title} preview`} className="max-h-40 rounded border border-gray-600" />
          </div>
        ): (
          <div className='bg-gray-400 h-40 aspect-video ml-auto text-center text-gray-950'>Image Preview of Website</div>
        )}

      </div>

      <div className='flex'>
        <p className="text-gray-200 mr-10 whitespace-pre-line wrap-break-words">{data.description}</p>

        {data.tools && data.tools.length > 0 && (
          <div className='min-w-70 ml-auto'>
            <div className="text-sm mb-1">Tools</div>
            <ul className="space-y-2">
              {data.tools.map((tool, idx) => (
                <li key={idx} className="border border-gray-600 rounded p-2">
                  <div className="font-semibold text-sm">{tool.name}</div>
                  <div className="text-xs text-gray-300">{tool.description}</div>
                  {tool.linkTo && (
                    <a href={tool.linkTo} target="_blank" rel="noreferrer" className="text-xs text-blue-300 hover:underline">Open</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>);
}

function Spaces() {
  const [selectedSpace, setSelectedSpace] = useState<SpaceCardContent | null>(null);
  const spaces: SpaceCardContent[] = [
    {
      title: 'Islam Space',
      subdomain: "islam",
      status: SpaceType.Maintainance,
      statusSince: "01-01-2025",
      spaceDiscoveredAt: "01-01-2025",
      routeModifiedAt: null,
      data: {
        description: 'Quran reader and prayer times',
        previewImageURL: null,
        relatedLinks: [{
          name: "Prayer Times",
          linkTo: null,
          logoURL: null
        },
        {
          name: "Medina",
          linkTo: "Link",
          logoURL: "https://styles.redditmedia.com/t5_4892g8/styles/communityIcon_rydh5buhaf881.png?width=128&frame=1&auto=webp&s=2629e8e5c98da442e24dce9464fb3d41c54277a9"
        }],
        tools: null
      }
    },
    {
      title: 'Discord Space', 
      subdomain: "discordtools",
      status: SpaceType.Accessible,
      statusSince: null,
      spaceDiscoveredAt: "01-01-2025",
      routeModifiedAt: "02-01-2025",
      data: {
        description: `Discord related tools.
        This space is dedicated to collect and display all your Discord related tools in one place!

        Currently the space has some open tools you can access at any time such as timestamp converters, but you can also view events from registered guilds! Once you log-in you get even more functionality to view, sign-up for and create events (granted you have the permissions within the selected guild)
        `,
        previewImageURL: null,
        relatedLinks: [{
          name: "discord",
          linkTo: "https://discord.com",
          logoURL: "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e278299a53f5bf88615e90_Symbol.svg"
        }],
        tools: [
          {
            name: "Time Converter",
            description: "Convert time in a friendly manner",
            linkTo: "Link"
          },
          {
            name: "Guild Event Manager",
            description: "Helper to manage guild events",
            linkTo: null
          }
      ]
      }
    }
  ];

  

  return <>
      <RootNav/>
      <div className='flex p-12'>
        <div className='w-2/10'>
          <div className='text-3xl pb-5 border-b-2 border-gray-500'>Spaces</div>
          <div>
            {spaces.map((space) => (
              <div key={space.title} className='mt-4'>
                <SpaceCard
                  {...space}
                  onSelect={() => setSelectedSpace(space)}
                  isSelected={selectedSpace?.title === space.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='border-l-2 border-gray-500 ml-auto mr-auto h-100'></div>
        <div className='w-75/100 p-6'>
          <SpaceInformation space={selectedSpace} />
        </div>
      </div>
    </>
}

export default Spaces;