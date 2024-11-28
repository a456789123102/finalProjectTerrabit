import React from 'react'

type Cart = {
id: number;
userId: number;
productId: number;
quantity:number;
}

function productCart({ cart}:{cart:Cart}) {
        return (
        <div className='bg-slate-50 mt-5 w-full h-20 flex flex-row p-2 text-[0.8rem]'>
            <div className='w-1/2 pl-5 flex border'>
                <div className='pr-2 items-center flex'>AAA</div>
                <div className='items-start'>{cart.product.name}</div>
            </div>
            <div className='flex flex-row w-1/2 justify-around items-center'>
                <div className='flex  gap-2'>
                    <div className='line-through'>฿{cart.product.price}</div>
                    <div>฿{cart.product.finalPrice}</div>
                </div>
                <div className='bg-white text-black '>
                    <button className="px-2 py-1 border" >-</button>
                    <span className=' px-3 py-1'>{cart.quantity}</span>
                    <button className="px-2 py-1  border">+</button>
                </div>
                <div>฿{cart.product?.finalPrice && cart.quantity
        ? `฿${cart.product.finalPrice * cart.quantity}`
        : "Price not available"}</div>
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