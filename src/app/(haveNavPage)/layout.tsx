import React from 'react'
import Nav from '../components/nav'
import { PropsWithChildren } from 'react'
import Text from '../components/text';
function Layout({ children }: PropsWithChildren) {
    return (
      <Text className="">
        <Nav />  {/* Nav จะอยู่ภายใต้ Logo */}
        <div className="pt-7 bg-gray-100 w-full h-screen">
          {children}  {/* Content ของแต่ละหน้า */}
        </div>
      </Text>
    );
  }
  
  export default Layout;
