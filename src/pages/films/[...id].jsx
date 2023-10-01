import InformationBlock from '@/components/InformationBlock';
import Playtime from '@/components/Playtime';
import Rating from '@/components/Rating';
import Image from 'next/image';
import ErrorMsg from '../../components/Error';

export default function Film({ information }) {
  const src = information?.Poster?.toLowerCase().startsWith('https://') ? information?.Poster : `/images/placeholder.jpg`;

  if (information.Error) return <ErrorMsg msg={information.Error} />;
  return (
    <main>
      <div className='relative w-full aspect-video max-h-[450px]'>
        <Image src={src} alt={information.Title || 'Placeholder'} fill className='object-cover' priority />
        <div className='absolute top-0 left-0 w-full h-full bg-black/60'>
          <div className='flex flex-col justify-center items-center h-full'>
            <div className='text-white text-4xl uppercase mb-2 font-bold'>{information.Title}</div>
            <div className='text-white text-xs uppercase'>{information.Genre}</div>
          </div>
        </div>

        <div className='absolute bottom-0 right-0 flex items-center gap-3 m-3'>
          <Playtime runtime={information.Runtime} />
          <Rating rating={information.imdbRating} />
        </div>
      </div>

      <div className='flex flex-col mx-auto align-center mt-5 px-3 max-w-xl'>
        <div className='flex flex-col mb-2'>
          <div className='text-2xl font-bold mb-2'>Directed by: {information.Director}</div>
          <div className='text-xs uppercase'>{information.Awards}</div>
        </div>
        <div className='mb-2'>{information.Plot}</div>

        <InformationBlock title='Top cast:' description={information.Actors} />
        <InformationBlock title='Awards:' description={information.Awards} />
        <InformationBlock title='Released on:' description={information.Released} />
      </div>
    </main>
  );
}

// Get serverside props
export async function getServerSideProps(context) {
  const { id } = context.query;

  let information;
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMD_KEY}&i=${id}`);
    information = await res.json();
  } catch (err) {
    console.warn(err);
    information = { Error: 'Failed to fetch information' };
  }

  return {
    props: {
      information
    }
  };
}
