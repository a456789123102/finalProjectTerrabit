import React from 'react'

function MyAccount() {
    return (
        <div className='p-2 flex flex-col'>
            <div className='p-2 border-b'>
                <div>My Account Info:</div>
                <div className='text-[0.75rem] text-gray-600'>Manage private informations for user safety</div>
            </div>
            <div className='flex flex-row'>
                <div className=' border flex flex-col w-2/3  gap-2 px-4'>
                    <div className='flex flex-row gap-3 w-full'>
                        <div className='w-1/3 text-right'>E-mail</div>
                        <input className='border' />
                    </div>

                    <div className='flex flex-row gap-3 w-full'>
                        <div className='w-1/3 text-right'>UserName</div>
                        <input className='border' />
                    </div>

                    <div className='flex flex-row gap-3 w-full items-baseline'>
                        <div className='w-1/3 text-right'>Passwords</div>
                       <div className='text-[0.8rem] text-blue-700'>Change Passwords</div>
                    </div>


                </div>
                <div className='border-l flex flex-col items-center justify-center'>
                    <div className='h-4/6'> user pic is here na</div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount