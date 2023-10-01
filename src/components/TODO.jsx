/**
 * TODO component.
 *
 * @param {ReactNode} children The content of the TODO component.
 *
 * @return {JSX.Element} The TODO component.
 */
export default function TODO({ children }) {
  return (
    <div className='p-3 text-center mx-auto max-w-xl text-gray-400 italic'>
      <div className='text-2xl font-bold'>{`// TODO:`}</div>
      <div>{children}</div>
    </div>
  );
}
