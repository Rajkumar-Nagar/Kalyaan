
"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {

    const localHost = "http://localhost:3000/api/user"

    const [signIn, setsignIn] = useState({
        Name: "",
        Email: "",
        password: "",
        cpassword:""
    })

    const handleSignIn = (value, field) => {
        setsignIn((prev) => (
            { ...prev, [field]: value }
        ))
    }

    const handleSignInPage = async () => {
        try {



          const response = await fetch(`${localHost}/resister`,
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userName: signIn.Name,
                email:signIn.Email,
                password: signIn.password,
              }),
            },
          )
          if (!response.ok) {
            throw new Error('signIn successfully');
          }
          
          const result = await response.json();
          console.log('signIn successful:', result);
        } catch (error) {
          console.error('Error during signIn:', error);
        }
    
      }

    return (
        <div className="SignIN w-full h-full">
            <div className= " w-[80%] xl:w-[50%] flex flex-col space-y-5 px-6 rounded-md py-6 bg-slate-400 m-auto mt-20">
                <h1 className='text-center'> SignIn</h1>
                <div className=''>
                    <h1>Name</h1>
                    <input
                        type="text"
                        required
                        name='name'
                        value={signIn.Name}
                        className='w-full h-10 px-5 border-pink-100 text-black'
                        onChange={e => handleSignIn(e.target.value, "Name")}
                    />
                </div>
                <div className=''>
                    <h1>Email</h1>
                    <input
                        type="email"
                        required
                        name='Email'
                        value={signIn.Email}
                        className='w-full h-10 px-5 border-pink-100 text-black'
                        onChange={e => handleSignIn(e.target.value, "Email")}
                    />
                </div>

                <div className=''>
                    <h1>Password</h1>
                    <input
                        type="password"
                        required
                        name='name'
                        value={signIn.password}
                        className='w-full h-10 px-5 border-pink-100 text-black'
                        onChange={e => handleSignIn(e.target.value, "password")}
                    />
                </div>

                <div className=''>
                    <h1>confirm password</h1>
                    <input
                        type='text'
                        name='name'
                        required
                        value={signIn.cpassword}
                        className='w-full h-10 px-5 border-pink-100 text-black'
                        onChange={e => handleSignIn(e.target.value, "cpassword")}
                    />
                </div>

                <button onClick={handleSignInPage} className='w-full h-10 rounded-md hover:bg-green-400 active:bg-green-300 bg-green-300'>
                    SignIn
                </button>

                <div className='text-center space-x-2'>
                    <span>Already have account ?</span>

                   <Link href="/Login" className='underline'>Login</Link>

                </div>

            </div>

        </div>
    )
}

export default Page