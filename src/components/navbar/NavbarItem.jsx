import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * NavbarItem component.
 *
 * @param {string} text The text of the navbar item.
 * @param {string} icon The icon of the navbar item.
 * @param {string} href The href of the navbar item.
 *
 * @return {JSX.Element} The NavbarItem component.
 */
export default function NavbarItem({ text, icon, href = '#' }) {
  const { route } = useRouter();
  const [active, setActive] = useState(false);

  // Check route to depend if active or not
  useEffect(() => {
    // Get the first part of the route
    const splitRoute = route.split('/');

    // Update the first part of the route so it looks like the href we want to compare to
    // The folder we want to compare to is always at place 1
    const compareRoute = `/${splitRoute[1]}`;

    // If matching, set active to true
    setActive(compareRoute === href);
  }, [route, href]);

  return (
    <Link href={href}>
      <button
        className={`flex flex-col justify-center content-center items-center hover:text-yellow-600 duration-300 
          ${active ? 'text-yellow-500' : ''}`}
        aria-label={text}
        tabIndex='0'
        aria-pressed={active ? 'true' : 'false'}
      >
        <div className='relative w-[30px] h-[30px] grow-1 cursor-pointer'>
          <Image src={`/images/icons/${icon}`} alt={text} fill style={{ objectFit: 'contain' }} className='p-[2px]' priority />
        </div>
        <div className='font-semibold'>{text}</div>
      </button>
    </Link>
  );
}
