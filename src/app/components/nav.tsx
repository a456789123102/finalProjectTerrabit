import React from 'react'
import Text from './text'
function Nav() {
    return (
        <Text className='flex flex-row justify-between bg-[#183D3D] h-7 px-5 text-yellow-400 '>
            <div className='flex flex-row gap-7'>
                <div>Games</div>
                <div>Products</div>
                <div>News</div>
                <div>Careers</div>
                <div>Services</div>
            </div>
            <div className='flex flex-row items-center'><input className='h-6 rounded-md pl-3 text-amber-800'></input><div className=' pl-3'>Search</div></div>
            <div>Sign in</div>
        </Text>
    )
}

export default Nav
