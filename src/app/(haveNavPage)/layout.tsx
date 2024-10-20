import React from 'react'
import Nav from '../components/nav'
import { PropsWithChildren } from 'react'
function Layout({ children }: PropsWithChildren) {
    return (
      <div className="bg-[#DAD3BE]">
        <Nav />  {/* Nav จะอยู่ภายใต้ Logo */}
        <div className="pt-3">
          {children}  {/* Content ของแต่ละหน้า */}
        </div>
      </div>
    );
  }
  
  export default Layout;
