import React from 'react'
import Nav from '../components/nav'
import { PropsWithChildren } from 'react'
import Text from '../components/text';
function Layout({ children }: PropsWithChildren) {
  return (
    <Text className="">
      <Nav />  {/* Nav */}
      <div className="bg-[#363636] w-full h-screen">
        {children}  {/* Content */}
      </div>
    </Text>
  );
}
  export default Layout;
