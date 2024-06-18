import React, { ReactNode } from 'react'

//This layout is responsible for maintaining the layout of all pages which are inside this(root) group 
//for ex if we  use navbar and footer componnet here . then it will be reflected in all the pages 
//which are inside (root)
//{children} here means all the pages.

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
     
       {children}
    
    </main>
  )
}

export default RootLayout
