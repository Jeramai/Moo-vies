import '@/app/globals.css';
import Head from 'next/head';
import Navbar from './navbar';
import Topbar from './topbar';

/**
 * Layout component.
 *
 * @param {ReactNode} children The content of the layout component.
 *
 * @return {JSX.Element} The Layout component.
 */
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>🐮-vies</title>
        <meta name="description" content="The best next MOOOOO-vie app" />
      </Head>

      <div className='relative min-h-screen flex flex-col justify-between'>
        <div className='block grow'>
          <Topbar />

          {children}
        </div>

        <Navbar />
      </div>
    </>
  );
}
