/**
 * InformationBlock component.
 *
 * @return {JSX.Element} The InformationBlock component.
 */
export default function InformationBlock({ title, description }) {
  return (
    <div className='flex flex-col mb-1'>
      <div className='font-semibold'>{title}</div>
      <div className=''>{description}</div>
    </div>
  );
}
