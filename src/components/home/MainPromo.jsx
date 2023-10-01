import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * MainPromo component.
 *
 * @param {object} mainPromo The main promo data.
 *
 * @return {JSX.Element} The MainPromo component.
 */
export default function MainPromo({ mainPromo }) {
  const [linkHref, setLinkHref] = useState('#');

  // Update link information based on feedback type
  useEffect(() => {
    setLinkHref(`${mainPromo?.Type === 'movie' ? 'films' : 'series'}/${mainPromo?.imdbID}`);
  }, [mainPromo?.Type, mainPromo?.imdbID]);

  // Show loading block
  if (!mainPromo) {
    return <ImageBlock />;
  }

  // Show error block
  if (mainPromo.Error) {
    console.error(mainPromo.Error); // TODO: Log with an actual logger
    return (
      <ImageBlock>
        <span className='text-red-700 font-semibold'>{`Error: ${mainPromo.Error}`}</span>
      </ImageBlock>
    );
  }

  // Actual content
  return (
    <div id='mainPromo' className='w-full px-3'>
      <ImageBlock backgroundEffectColor='bg-yellow-600'>
        <Link href={linkHref} className='absolute w-full h-full'>
          <Image
            src={mainPromo.Poster}
            alt={mainPromo.Title}
            className='rounded-2xl object-cover object-center'
            priority={true}
            loading='eager'
            quality={100}
            fill
          />
        </Link>
      </ImageBlock>
      <div className='flex flex-col items-center my-3'>
        <Link href={linkHref} className='text-4xl font-bold'>
          {mainPromo.Title}
        </Link>
        <Link href={linkHref} className='font-semibold text-gray-500'>
          {mainPromo.Awards}
        </Link>
      </div>
    </div>
  );
}

// TODO: Get backgroundEffectColor from the image
/**
 * ImageBlock component.
 *
 * @param {ReactNode} children The content of the ImageBlock component.
 * @param {string} backgroundEffectColor The background effect color.
 *
 * @return {JSX.Element} The ImageBlock component.
 */
function ImageBlock({ children, backgroundEffectColor = '' }) {
  return (
    <div
      className={`relative m-auto w-full max-w-xl px-3 flex justify-center items-center ${
        backgroundEffectColor ? 'mb-5' : ''
      } group`}
    >
      {/* Add backgound effect if color is provided */}
      {backgroundEffectColor ? (
        <div
          className={`w-[80%] aspect-video absolute top-2 h-full rounded-2xl ${backgroundEffectColor} group-hover:top-3 duration-300`}
        />
      ) : null}

      {/* Content */}
      <div className='w-full aspect-video'>
        <div className='relative text-center bg-gray-200 rounded-2xl h-full shadow-[0_0_25px_-10px_rgba(0,0,0,0.8)] flex justify-center items-center'>
          {/* Show provided content or the loading icon  */}
          {children || <span className='animate-pulse text-6xl grayscale'>🐮</span>}
        </div>
      </div>
    </div>
  );
}
