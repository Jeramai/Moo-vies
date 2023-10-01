import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * SearchResults component.
 *
 * @param {string} value The search value.
 * @param {function} clearSearch Callback function to be called when the user clicks the clear search button.
 *
 * @return {JSX.Element} The SearchResults component.
 */
export default function SearchResults({ value, clearSearch }) {
  const [results, setResults] = useState([]);

  // Get results from API
  useEffect(() => {
    if (value) {
      fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMD_KEY}&s=${value}`, { next: { revalidate: 3600 } })
        .then((res) => res.json())
        .then((data) => {
          if (data.Error) {
            console.warn(data);

            // Set results to empty to show no results to user
            setResults();
            return;
          }
          setResults(data.Search);
        })
        .catch((err) => console.warn(err));
    }
  }, [value]);

  return (
    <div id='searchResults'>
      {results?.length ? (
        results?.map((result) => <Result key={result.imdbID} {...result} clearSearch={clearSearch} />)
      ) : (
        <div className='text-gray-400 italic'>
          No results found for <span className='font-semibold'>{value}</span>.
        </div>
      )}
    </div>
  );
}

/**
 * Result component.
 *
 * @param {string} imdbID The IMDb ID of the movie or TV show.
 * @param {string} Title The title of the movie or TV show.
 * @param {string} Type The type of media (movie or TV show).
 * @param {string} Year The year the movie or TV show was released.
 * @param {function} clearSearch Callback function to be called when the user clicks the clear search button.
 *
 * @return {JSX.Element} The Result component.
 */
function Result({ imdbID, Title, Type, Year, clearSearch }) {
  const href = `/${Type === 'movie' ? 'films' : 'series'}/${imdbID}`;

  return (
    <Link href={href} onClick={clearSearch} className='flex items-center gap-2 hover:bg-slate-400/20 px-2 py-1 rounded-lg'>
      <Image
        src={Type === 'movie' ? '/images/icons/film.svg' : '/images/icons/serie.svg'}
        alt={Type}
        width={30}
        height={30}
        style={{ filter: 'invert(1)' }}
        className='p-[2px]'
      />
      <div className='font-semibold'>{Title}</div>
      <span>-</span>
      <div>{Year}</div>
    </Link>
  );
}
