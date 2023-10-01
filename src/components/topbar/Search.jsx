import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

const DynamicSearchModal = dynamic(() => import('../Search/Modal'));

/**
 * Search component.
 *
 * @return {JSX.Element} The Search component.
 */
export default function Search() {
  const [searchModal, setSearchModal] = useState(false);

  return (
    <>
      <button className='relative w-[30px] h-[30px] grow-1' onClick={() => setSearchModal(true)}>
        <Image src='/images/icons/search.svg' alt='Loop icon' fill style={{ objectFit: 'contain' }} className='p-[2px]' />
      </button>

      <DynamicSearchModal show={searchModal} onHide={() => setSearchModal(false)} />
    </>
  );
}
