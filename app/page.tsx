
import Link from 'next/link'



export default async function Home() {
  return (

    <div className='w-screen h-screen bg-black flex justify-center items-center text-white'>
      <div className='w-full max-w-[600px] mx-auto'>
        <h1 className='text-6xl mb-4'>The best Journal app!</h1>
        <p className='text-2xl text-white/60 mb-8'>This is the best app for tracking your mood through out your life. All you have to do is be honest</p>
        <div>
          <Link href='/journal'>
          <button className='bg-blue-700 rounded-lg text-xl px-4 py-2'>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
