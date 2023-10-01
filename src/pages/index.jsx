import ForYou from '@/components/home/ForYou';
import MainPromo from '@/components/home/MainPromo';

export default function Home({ mainPromo, recommended }) {
  return (
    <main className='flex flex-col items-center justify-between'>
      <MainPromo mainPromo={mainPromo} />
      <ForYou recommended={recommended} />
    </main>
  );
}

// Fetch promo object from external API
export async function getServerSideProps() {
  let mainPromo, recommended;
  try {
    const resRecommended = await fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMD_KEY}&s=Chucky`);
    const resPromo = await fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMD_KEY}&i=tt8388390`);
    mainPromo = await resPromo.json();
    const { Search } = await resRecommended.json();
    recommended = Search;
  } catch (err) {
    console.warn(err);
    const ErrorMsg = 'Failed to fetch information';
    mainPromo = { Error: ErrorMsg };
    recommended = { Error: ErrorMsg };
  }

  return {
    props: {
      mainPromo,
      recommended
    }
  };
}
