import Logo from './Logo';
import Search from './Search';
import Tickets from './Tickets';

/**
 * Topbar component.
 *
 * @return {JSX.Element} The Topbar component.
 */
export default function Topbar() {
  return (
    <div className='relative w-full h-[55px] flex justify-between items-center gap-3 px-3 mb-2'>
      <Tickets />
      <Logo />
      <Search />
    </div>
  );
}
