import React from 'react'

import { PropsWithChildren } from 'react'

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-gray-100 w-full min-h-screen">
      {children}  
    </div>
  );
}

  
  export default Layout;
