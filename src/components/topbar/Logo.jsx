import Link from 'next/link';

/**
 * Logo component.
 *
 * @return {JSX.Element} The Logo component.
 */
export default function Logo() {
  return (
    <div className='relative w-full h-full flex justify-center items-center text-xl font-bold'>
      <Link href='/' className='px-3 py-1'>
        🐮-vies
      </Link>
    </div>
  );
}
