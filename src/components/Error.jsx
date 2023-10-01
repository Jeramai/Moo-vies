import Link from 'next/link';

/**
 * ErrorMsg component.
 *
 * @return {JSX.Element} The ErrorMsg component.
 */
export default function ErrorMsg() {
  return (
    <div className='h-full w-full text-center py-20'>
      <p className='text-xl font-bold mb-3'>Woops, something went wrong.</p>

      <Link href='/'>
        <button className='text-yellow-500 underline hover:text-yellow-600'>{`Let's go back to safety`}</button>
      </Link>
    </div>
  );
}
