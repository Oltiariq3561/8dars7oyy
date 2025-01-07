import React from 'react'

function LeftBar() {
  return (
    <div className='p-2'>
      <div>
        <h1 className='mb-2 cursor-pointer text-gray-500  hover:text-white'>Home</h1>
        <h1 className='mb-2 cursor-pointer text-gray-500  hover:text-white'>Search</h1>
        <h1 className='cursor-pointer text-gray-500  hover:text-white'>Your Library</h1>
      </div>
      <div className='mt-4 mb-4'>
        <h1 className='mb-2 cursor-pointer text-gray-500  hover:text-white'>Create Playlist</h1>
        <h1 className='cursor-pointer text-gray-500  hover:text-white'>Liked Songs</h1>
      </div>
      <div className='w-60 bg-white h-1'> </div>
      <div className='pt-4'>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Chill Mix</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Insta Hits</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Your Top Songs 2021</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Mellow Songs</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Anime Lofi & Chillhop Music</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>BG Afro “Select” Vibes</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Afro “Select” Vibes</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Happy Hits!</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Deep Focus</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Instrumental Study</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>OST Compilations</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Nostalgia for old souled mill...</p>
        <p className='mt-2 cursor-pointer text-gray-500  hover:text-white'>Mixed Feelings</p>
      </div>
    </div>

  )
}

export default LeftBar