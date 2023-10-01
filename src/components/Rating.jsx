/**
 * Rating component.
 *
 * @param {number} rating The rating of the movie or TV show.
 * @param {string} className Any additional CSS class names to be applied to the component.
 *
 * @return {JSX.Element} The Rating component.
 */
export default function Rating({ rating, className = '' }) {
  return <div className={`rounded-xl px-3 py-2 bg-yellow-400 font-semibold ${className}`}>IMDB {rating}</div>;
}
