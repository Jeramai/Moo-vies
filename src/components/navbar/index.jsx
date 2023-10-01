import NavbarItem from './NavbarItem';

/**
 * Navbar component.
 *
 * @return {JSX.Element} The Navbar component.
 */
export default function Navbar() {
  return (
    <nav className='sticky bottom-0 w-full h-[100px] shadow-[0_0_25px_-10px_rgba(0,0,0,0.3)] flex items-center justify-evenly mt-3 bg-white'>
      <div className='flex items-center justify-evenly h-full w-full max-w-xl'>
        <NavbarItem text='Home' icon='home.svg' href='/' />
        <NavbarItem text='Films' icon='film.svg' href='/films' />
        <NavbarItem text='Series' icon='serie.svg' href='/series' />
        <NavbarItem text='Me' icon='person.svg' href='/profile' />
      </div>
    </nav>
  );
}
