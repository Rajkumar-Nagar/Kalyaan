
"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {

  const localHost = "http://localhost:3000/api/user"

  const [logindata, setlogindata] = useState({
    Name: "",
    password: "",
  })

  const handelLogin = (value, field) => {
    setlogindata((prev) => (
      { ...prev, [field]: value }
    ))
  }

  const handleLoginPage = async () => {
    try {
      const response = await fetch(`${localHost}/login`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: logindata.Name,
            password: logindata.password,
          }),
        },
      )
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const result = await response.json();
      console.log('Login successful:', result);
    } catch (error) {
      console.error('Error during login:', error);
    }

  }

  return (
    <div className="SignIN w-full h-full">
      <div className=" w-[80%] xl:w-[50%] flex flex-col space-y-5 px-6 rounded-md py-6 bg-slate-400 m-auto mt-20">
        <h1 className='text-center'> Login</h1>
        <div className=''>
          <h1>Name</h1>
          <input
            type="text"
            required
            name='name'
            value={logindata.Name}
            className='w-full h-10 px-5 border-pink-100 text-black'
            onChange={e => handelLogin(e.target.value, "Name")}
          />
        </div>

        <div className=''>
          <h1>Password</h1>
          <input
            type="password"
            required
            name='password'
            value={logindata.password}
            className='w-full h-10 px-5 border-pink-100 text-black'
            onChange={e => handelLogin(e.target.value, "password")}
          />
        </div>

        <button onClick={handleLoginPage} className='w-full h-10 rounded-md hover:bg-green-400 active:bg-green-300 bg-green-300'>
          Login
        </button>

        <div className='text-center space-x-2'>
          <span>Don't have an account ?</span>

          <Link href="/SignIn" className='underline'>SignIn</Link>

        </div>

      </div>

    </div>
  )
}

export default Page