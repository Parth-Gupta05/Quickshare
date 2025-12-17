import React from 'react'

function FileRoomCard(props) {
    const data=props.data
  return (
    <div className='w-[15rem] relative p-[1rem] rounded-xl h-[5rem] bg-black '>
      <p className='font-thin '>{data.originalName?.substr(0,15)} ...</p>
      <p className=' inline-block mt-[0.5rem] pb-[0.1rem] pl-[0.2rem] rounded pr-[0.2rem] pt-[0.1rem] bg-gray-500 text-[0.8rem] text-white opacity-50'>{data.format}</p>
      <div className='absolute flex text-sm justify-center items-center gap-2 bottom-[1rem] right-[1rem]'>
      
      <button  onClick={()=>props.setFile(props.file)} disabled={data.format=='zip'?true:false} className='w-[1rem] rounded h-[1rem] flex justify-center items-center ' alt='preview'><i className="ri-eye-line"></i></button>
      <a className='p-0 m-0 box-border' href={data.url} download target="_blank" rel="noopener noreferrer">
      <button className='w-[1rem] rounded h-[1rem]  flex justify-center items-center ' alt='download'><i className="ri-download-line"></i></button>
      </a>
      </div>
    </div>
  )
}

export default FileRoomCard
