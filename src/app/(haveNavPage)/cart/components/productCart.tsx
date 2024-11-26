import React from 'react'

function productCart() {
    return (
        <div className='bg-slate-50 mt-5 w-full h-20 flex flex-row p-2 text-[0.8rem]'>
            <div className='w-1/2 pl-5 flex border'>
                <div className='pr-2 items-center flex'>pic</div>
                <div className='items-start'>Product name</div>
            </div>
            <div className='flex flex-row w-1/2 justify-around items-center'>
                <div className='flex  gap-2'>
                    <div className='line-through'>฿100</div>
                    <div>฿99</div>
                </div>
                <div className='bg-white text-black '>
                    <button className="px-2 py-1 border" >-</button>
                    <span className=' px-3 py-1'>2</span>
                    <button className="px-2 py-1  border">+</button>
                </div>
                <div>฿198.00</div>
                <div className='flex flex-col'>
                    <div>
                        <div>Delete</div>
                        <div>Related</div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default productCart