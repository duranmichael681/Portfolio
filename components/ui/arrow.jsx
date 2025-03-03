import { AiOutlineRight } from 'react-icons/ai'

export default function ArrowText({ text }) {
  return (
    <div className='flex items-center space-x-2'>
      <span className='text-white text-xl font-semibold'>{text}</span>
      <AiOutlineRight className='arrow text-white text-xl transition-transform duration-300 ease-in-out' />
    </div>
  )
}
