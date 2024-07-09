import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'
//this page is Server side rendered . Improving  the performance and optiminzing project.
//it will be loaded more quickly  then Client side rendering(MeetingTypeList)

const Home = () => {
  const  now= new Date();
  const time=now.toLocaleTimeString('en-US',{hour:'2-digit' , minute:'2-digit'})
  const date=now.toDateString();
  return (
    <section className='flex size-full  flex-col gap-10 text-white'>
      {/* //we are rendering that home banner with the help of bg-hero  that we have configured in tailwind config  */}
     <div className='h-[300px] w-full  rounded-[20px] bg-hero bg-cover'>
      <div className=' flex h-full flex-col max-md:px-5 max-md:py-8 lg:p-11 justify-between '>
        <h2 className='glassmorphism max-w-[270px] rounded-xl py-2 text-center text-base  font-normal '>
          Upcoming  meeting at ⏱️ 12:30 PM 
        </h2>
        <div className=' flex flex-col  gap-2'>
          <h1  className='text-4xl font-extrabold  lg:text-7xl ' > {time}</h1>
          <p  className='text-lg  font-medium lg:text-2xl  text-sky-300 '>{date}</p>
        </div>

      </div>
      

     </div>
     {/* this component is Client side rendered because it will redirect to multiple pages  based on user behaviourr */}
     <MeetingTypeList/>
    

 
   
    </section>
  )
}

export default Home
