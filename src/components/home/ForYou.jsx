import Image from 'next/image';
import Link from 'next/link';

/**
 * ForYou component.
 *
 * @param {object[]} recommended A list of recommended items.
 *
 * @return {JSX.Element} The ForYou component.
 */
export default function ForYou({ recommended }) {
  return (
    <div id='forYou' className='pt-8 pb-2 px-3 overflow-hidden w-full'>
      <div className='text-2xl font-bold mb-3 max-w-xl m-auto'>{"You'll like these 🔥"}</div>
      <div className='flex overflow-x-scroll'>
        {recommended?.length
          ? recommended.map((item) => {
              return <ImageBlock key={item.imdbID} {...item} />;
            })
          : // If no objects are found, show placeholders
            Array.from({ length: 7 }).map((item, index) => {
              return (
                <div key={index} className='animate-pulse'>
                  <ImageBlock imdbID={index} Title='Placeholder' />
                </div>
              );
            })}
      </div>
    </div>
  );
}

/**
 * ImageBlock component.
 *
 * @param {string} imdbID The IMDb ID of the movie or TV show.
 * @param {string} Type The type of media (movie or TV show).
 * @param {string} Title The title of the movie or TV show.
 * @param {string} Poster The URL of the poster image for the movie or TV show.
 *
 * @return {JSX.Element} The ImageBlock component.
 */
function ImageBlock({ imdbID, Type, Title, Poster }) {
  const src = Poster?.toLowerCase().startsWith('https://') ? Poster : `/images/placeholder.jpg`;
  const href = Type ? `${Type === 'movie' ? 'films' : 'series'}/${imdbID}` : '#';

  return (
    <div className='flex flex-col items-center px-3'>
      <div className='relative h-[350px] min-w-[200px] group'>
        <div className='absolute bg-red-500 w-full h-full rounded-2xl left-1 top-1 group-hover:left-2 group-hover:top-2 duration-300'></div>
        <Link href={href} className='p-3 absolute w-full h-full'>
          <Image
            src={src}
            alt={Title}
            className='rounded-2xl object-cover object-center shadow-[0_3px_10px_5px_rgba(0,0,0,0.075)]'
            priority={true}
            loading='eager'
            quality={100}
            fill
            sizes='350px'
          />
        </Link>
      </div>
      <div className='flex flex-col items-center my-3 px-3'>
        <Link href={href} className='p-3 text-lg text-center font-bold'>
          {Title}
        </Link>
      </div>
    </div>
  );
}
