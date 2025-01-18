import React from 'react'

import { PropsWithChildren } from 'react'

function Layout({ children }: PropsWithChildren) {
    return (
      <div className="">
        <div className="pt-7 bg-gray-100 w-full h-screen">
          {children}  
        </div>
      </div>
    );
  }
  
  export default Layout;
