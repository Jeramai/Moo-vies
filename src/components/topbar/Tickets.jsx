import Image from 'next/image';
import Link from 'next/link';

/**
 * Tickets component.
 *
 * @return {JSX.Element} The Tickets component.
 */
export default function Tickets() {
  return (
    <Link href='/tickets' className='relative w-[30px] h-[30px] flex'>
      <Image src='/images/icons/ticket.svg' alt='Simple ticket icon' fill style={{ objectFit: 'contain' }} />
    </Link>
  );
}
