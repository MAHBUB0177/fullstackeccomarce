'use client'
import { RegisterUser } from '@/service/allApi'
import { message } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp = () => {
  const router=useRouter()
  const [usrData, setUserdata] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  })
  const handelSubmit=async(e:any)=>{
    e.preventDefault()
    if(!usrData?.name){
      return message.error('Name can not be empty')
    }
    if(!usrData?.email){
      return message.error('Email can not be empty')
    }
    if(!usrData?.password){
      return message.error('Password can not be empty')
    }
    if(!usrData?.confirmpassword){
      return message.error('Confirm Pssword can not be empty')
    }
    if(usrData?.password !== usrData?.confirmpassword){
      return message.error(' Pssword can not be match')
    }
    let payload = {
      name: usrData?.name,
      email: usrData?.email,
      password:usrData?.password,
    }

    await axios.post (`http://localhost:500/api/user/register`,payload)
      .then(response => {
        if (response?.data) {
          message.success(response?.data?.message)
          router.push('/auth')
  
        }
      })
      .catch(error => {
        message.error(error?.response?.data?.message)
      });
  }
  return (
    <>
      <section className="flex flex-col items-center pt-6 pb-[50px]">
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className=" flex justify-center items-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an
              account
            </h1>
            <form className="space-y-4 md:space-y-6" method="POST" >
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setUserdata({ ...usrData, name: e.target.value })}
                  placeholder="Emelia Erickson"  />
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e)=>setUserdata({...usrData,email:e.target.value})}
                placeholder="emelia_erickson24"  />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  onChange={(e)=>setUserdata({...usrData,password:e.target.value})}
                 />
              </div>

              <div>
                <label htmlFor="ConfirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">confirm password</label>
                <input type="password" name="confirmpassword" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  onChange={(e)=>setUserdata({...usrData,confirmpassword:e.target.value})}
                 />
              </div>
              <button type="submit" onClick={handelSubmit} className="w-full bg-black text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <span
                className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer" >
                <Link href={'/auth'}>
                  Sign in here </Link></span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp