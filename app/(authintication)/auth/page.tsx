'use client'
import { message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { json } from 'stream/consumers';

const Login = () => {
  const router=useRouter()
   //simple authentication part:
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const[loginData,setLoginData]=useState({
    email:'',
    password:''
   })
   console.log(loginData,'++++++++loginData')
   const LoginNow = async (e:any) => {
    e.preventDefault()
     let payload = {
      email: loginData?.email,//kminchelle 
      password: loginData?.password,//0lelplR
     }
     if(loginData?.email ==='' || loginData?.password === ''){
       return message.error('User Name Or Password Missing')
     }
     await axios.post('http://localhost:500/api/user/login', payload, {
     
     })
       .then(response => {
         if (response?.data) {
          console.log(response?.data,'+++++++++++++')
           message.success('User Successfully Logged In')
           localStorage.setItem('authdata', JSON.stringify(response?.data?.data));

          //  setToken(true)
          //  dispatch(setAuth(response?.data));
          //  dispatch(setSearchData(guestlist))
          //  router.push('/')
          window.location.href = '/'; 
   
         }
       })
       .catch(error => {
        //  console.error('An error occurred:', error); 
         message.error(error?.response?.data?.message)
       });
   };


  return (
    <div className='px-4 lg:px-20'>
 <div className="flex justify-center items-center dark:bg-gray-900">
  
        <div
          className="rounded-lg bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2"
        >
          <h1 className="pt-2 pb-2 font-bold dark:text-gray-400 text-2xl text-center cursor-default">
            Log in
          </h1>

          <form  className=''>
            <div>
              <label htmlFor="email" className="mb-2  dark:text-gray-400 text-lg">Email</label>
              <input
                id="email"
                className="border p-3 shadow-sm border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
                required
                onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">Password</label>
              <input
                id="password"
                className="border p-3 shadow-sm border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
                required
                onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
              />
            </div>
            <a
              className="group text-blue-400 transition-all duration-100 ease-in-out"
              // href="/"
            >
              <span
                className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              >
                Forget your password?
              </span>
            </a>
            
              <button
              className="bg-black shadow-lg mt-6 p-2 text-white rounded-lg w-full "
              // type="submit"
              onClick={LoginNow}
            >
              LOG IN
            </button>
          </form>

          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="dark:text-gray-300">
              Don't have an account?
             
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                href=""
              >
                 <Link href={'/signup'}>
                <span
                  className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                  Sign Up
                </span>
                </Link>
              </a>
              
            </h3>
          </div>
          <div
            id="third-party-auth"
            className="flex items-center justify-center mt-5 flex-wrap"
          >
            <button
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                alt="Google"
              />
            </button>
            <button
              // href="/"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                alt="Linkedin"
              />
            </button>
            <button
              // href="/"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
              <img
                className="max-w-[25px] filter dark:invert"
                src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                alt="Github"
              />
            </button>
            <button
              // href="/"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                alt="Facebook"
              />
            </button>
            <button
              // href="/"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
              <img
                className="max-w-[25px] dark:gray-100"
                src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
                alt="twitter"
              />
            </button>

            <button
              // href="/"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/"
                alt="apple"
              />
            </button>
          </div>

          <div
            className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm"
          >
            <p className="cursor-default">
              By signing in, you agree to our
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                // href="/"
              >
                <span
                  className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                  Terms
                </span>
              </a>
              and
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                // href="/"
              >
                <span
                  className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                >
                  Privacy Policy
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    

    </div>
  )
}

export default Login;