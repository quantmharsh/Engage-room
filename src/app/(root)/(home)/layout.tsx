import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

import React, { ReactNode } from 'react'

//This layout is responsible for maintaining the layout of all pages which are inside this(home) group 
//for ex if we  use navbar and footer componnet here . then it will be reflected in all the pages 
//which are inside (root)
//{children} here means all the pages.

const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className='relative'>
      <Navbar/>
        <div className='flex'>
         <Sidebar/>
            <section className='flex min-h-screen flex-1 flex-col  px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 '> 
             <div className='w-full'>
                
       {children}

             </div>
            </section>

        </div>
     
    
    </main>
  )
}

export default HomeLayout
