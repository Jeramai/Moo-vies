import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DynamicSearchResults = dynamic(() => import('./Result'));

/**
 * SearchModal component.
 *
 * @param {boolean} show Whether or not to show the search modal.
 * @param {function} onHide Callback function to be called when the search modal is hidden.
 *
 * @return {JSX.Element} The SearchModal component.
 */
export default function SearchModal({ show = false, onHide = () => {} }) {
  const [searchValue, setSearchValue] = useState('');

  // Clear the searchbar and hide it after link click
  const clearSearch = () => {
    setSearchValue('');
    onHide();
  };

  // On esc press, hide modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (show && e.key === 'Escape') onHide();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, onHide]);

  return show ? (
    <div id='searchModal' className='contents'>
      <div className='fixed top-0 left-0 w-screen h-screen z-40 bg-black/60' onClick={onHide}></div>
      <div className='fixed top-0 left-0 w-screen h-screen z-50 flex flex-col justify-center items-center pointer-events-none'>
        <div className='h-[500px] w-[90%] max-w-[500px] max-h-[500px] flex flex-col justify-center'>
          <div className='w-full h-fit text-white bg-black/80 rounded-lg flex flex-col py-3 pointer-events-auto'>
            <div className='flex justify-between items-start'>
              <div className='text-xl font-bold mb-3 px-3'>Search</div>
              <button
                className='mx-3 text-xs text-gray-400 border border-gray-700 rounded-sm px-[3px] py-[1px] hover:bg-gray-700 hover:text-white transition-all duration-200 
                  focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100'
                type='button'
                onClick={onHide}
              >
                Esc
              </button>
            </div>
            <input
              type='text'
              className='w-full h-[40px] border-t border-b border-black p-2 text-gray-400 bg-transparent focus:outline-none'
              autoFocus
              value={searchValue}
              placeholder='Search OMDb..'
              onChange={(e) => setSearchValue(e.target.value)}
            />

            {searchValue ? (
              <div className='p-3'>
                <DynamicSearchResults value={searchValue} clearSearch={clearSearch} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
