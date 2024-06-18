import { SignIn } from '@clerk/nextjs'
import React from 'react'

//[[...sign-in]] this folder is named like this because we wabt to catch all the 
//redirected sign-in request to this page  
const SignInPage = () => {
  return (
    <div className=' flex h-screen w-full items-center justify-center'>
      <SignIn/>
    </div>
  )
}

export default SignInPage