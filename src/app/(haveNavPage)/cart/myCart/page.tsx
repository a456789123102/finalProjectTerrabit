import React from 'react'

function page() {
    return (
        <div className='flex flex-col items-center'>
            <div className='self-start  p-2 bg-white w-full pl-5'>Shopping Cart</div>
            <div className='w-5/6 justify-center flex flex-col mt-5 '>
                {/* header */}
                <div className='flex flex-row w-full h-12 items-center border bg-slate-50 p-2'>
                    <div className='w-1/2 pl-5 border'>Product</div>
                    <div className='flex flex-row w-1/2 justify-around'>
                        <div>Unit Price</div>
                        <div>Quantity</div>
                        <div>Total Price</div>
                        <div>Actions</div>
                    </div>
                </div>
                {/* Product */}
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

            </div>
            {/* footer checkout will alwayfloat */}
            <div className="fixed bottom-0 w-full bg-gray-800 text-white text-center p-4">this is footer</div>
        </div>
    )
}

export default page