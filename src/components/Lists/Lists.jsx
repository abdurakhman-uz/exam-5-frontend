import React from 'react'

const Lists = (data, key) => {
  return (
    <li key={key} className='w-[1200px] h-[20px]'>
        <p>{data.name}</p>
    </li>
  )
}

export default Lists