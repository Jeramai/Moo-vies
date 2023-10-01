import Image from 'next/image';

/**
 * Playtime component.
 *
 * @param {string} runtime The runtime of the movie or TV show in minutes.
 *
 * @return {JSX.Element} The Playtime component.
 */
export default function Playtime({ runtime }) {
  return (
    <div className='text-white uppercase flex gap-2'>
      <Image
        src='/images/icons/clock.svg'
        alt='Clock'
        style={{ filter: 'invert(1)' }} // Turn the black SVG to white
        width={16}
        height={16}
      />
      <span>{runtime}</span>
    </div>
  );
}
