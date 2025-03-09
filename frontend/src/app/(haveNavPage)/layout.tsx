import React from 'react'
import Nav from '../components/nav'
import { PropsWithChildren } from 'react'
import Text from '../components/text';
function Layout({ children }: PropsWithChildren) {
  return (
    <Text className="">
      <Nav /> 
      <div className=" w-full min-h-screen"  
      >
        {children} 
      </div>
    </Text>
  );
}
  export default Layout;
