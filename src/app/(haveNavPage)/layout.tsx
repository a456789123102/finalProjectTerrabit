import React from 'react'
import Nav from '../components/nav'
import { PropsWithChildren } from 'react'
import Text from '../components/text';
function Layout({ children }: PropsWithChildren) {
    return (
      <Text className="bg-[#2E2E2E]">
        <Nav />  {/* Nav จะอยู่ภายใต้ Logo */}
        <div className="pt-3">
          {children}  {/* Content ของแต่ละหน้า */}
        </div>
      </Text>
    );
  }
  
  export default Layout;
