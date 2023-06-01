import React from 'react'

const Products = () => {

    var products = [
        {
            id: 1,
            name: 'Product 1',
            price: 100,
            image: 'https://images.unsplash.com/photo-1504399177817-512623663350?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        },
        {
            id: 2,
            name: 'Product 2',
            price: 200,
            image: 'https://images.unsplash.com/photo-1504399177817-512623663350?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        }
    ]

  return (
    <div className='w-[1210px] h-[600px] bg-white rounded-lg relative'>
        <div className=''>
            <p className='absolute w-[14px] h-[28px] rounded-[4px] bg-[#FFD88D] left-4 top-2'></p>
            <p className='absolute text-xl left-10 top-2'>Mashinalar</p>
        </div>

        <div className='text-white'>
            <button className='absolute right-64 top-2 px-[20px] py-[7px] rounded-xl bg-blue-500'>
                + Kategoriya qoshish
            </button>
            <button className='absolute right-14 top-2 px-[20px] py-[7px] rounded-xl bg-blue-500'>
                + Mashina qoshish
            </button>
        </div>

        <div className='absolute top-24'>
            <ul>
                <li className='border-b-2 w-[1200px] h-8 flex mb-4 justify-around'>
                <p className='w-[150px] text-center'>Markasi</p>
                <p className='w-[150px] text-center'>Gearbook</p>
                <p className='w-[150px] text-center'>Tanirovka</p>
                <p className='w-[150px] text-center'>Motor</p>
                <p className='w-[150px] text-center'>Year</p>
                <p className='w-[150px] text-center'>Color</p>
                <p className='w-[150px] text-center'>Distence</p>
                <p className='w-[150px] text-center'></p>

                </li>
                {
                    products.map(product => (
                        <li key={product.id} className='border-b-2 w-[1200px] h-10 flex justify-around items-center'>
                            <p className='w-[150px] text-center'>{product.name}</p>
                            <p className='w-[150px] text-center'>{product.name}</p>
                            <p className='w-[150px] text-center'>{product.name}</p>
                            <p className='w-[150px] text-center'>{product.name}</p>
                            <p className='w-[150px] text-center'>{product.name}</p>
                            <p className='w-[150px] text-center'>{product.name}</p>
                            <p className='w-[150px] text-center'>{product.name}</p>
                            <div className='w-[150px] text-center flex justify-center items-center'>
                                <button className='w-[40px] flex justify-center'><img src="/icons/pencil.svg" alt="" /></button>
                                <button className='w-[40px] flex justify-center'><img src="/icons/delete.svg" alt="" /></button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Products