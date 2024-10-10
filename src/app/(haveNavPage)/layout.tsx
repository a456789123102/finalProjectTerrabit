import React from 'react'
import Nav from '../components/nav'
import { PropsWithChildren } from 'react'
function layout({ children }: PropsWithChildren) {
    return (
        <div className='bg-[#DAD3BE]'>
            <Nav />
            {children}
        </div>
    )
}

export default layout
