'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function SingnupPage() {
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useRouter(); // for the navigation

  const handleSinupUser = async () => {
    try {
      setLoading(true);
      setIsDisabled(true);
      const userResp = await axios.post('/api/users/signup', userInputs);
      console.log("userResp", userResp);
      setLoading(false);
      setIsDisabled(false);
      navigate.push('/signin');
    } catch (error: any) {
      setLoading(false);
      console.log("error", error.message);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (userInputs.username.length > 0 && userInputs.email.length > 0 && userInputs.password.length > 0){
      setIsDisabled(false)
    }else{
      setIsDisabled(true);
    }
  }, [userInputs]);

  return (
    <div className='border flex flex-col min-h-screen items-center justify-center py-4'>
      <h3 className='pb-2'>Sign-up page</h3>
      <p className='mb-4'>{loading ? "Processing" : "Signup"}</p>
      <input 
      type='text'
      placeholder='Username'
      value={userInputs.username}
      onChange={(e) => setUserInputs({...userInputs, username: e.target.value})}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-noe focus:border-gray-600 text-black'
      />
      <input
        type='email'
        placeholder='Email'
        value={userInputs.email}
        onChange={(e) => setUserInputs({ ...userInputs, email: e.target.value })}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-noe focus:border-gray-600 text-black'
      />
      <input
        type='password'
        placeholder='Password'
        value={userInputs.password}
        onChange={(e) => setUserInputs({ ...userInputs, password: e.target.value })}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-noe focus:border-gray-600 text-black'
      />

      <button
        className={`${isDisabled ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-transparent'} mt-2 p-2 border w-40 border-gray-300 rounded-lg mb-4 focus:outline-noe focus:border-gray-600 text-white'`}
        onClick={handleSinupUser}
        disabled={isDisabled}
      >Sin up</button>

      <Link href="/signin">Go to signin</Link>
    </div>
  )
}
