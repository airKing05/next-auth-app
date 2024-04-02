'use client'
import axios from 'axios';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [errors, setErrors] = useState(false)

    // const router = useRouter();

    const handleVerification = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/verifyemail', token);
            setLoading(false);
            setIsVerified(true);
            setErrors(false)

            
        } catch (error: any) {
            console.log("error", error.message);
            setErrors(true)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        setErrors(false)
      // older approach
      const token = window.location.search.split("=")[1];
      setToken(token);

    //   const tokenNew = router.query.token;
    //     console.log("tokenNew", tokenNew)
        // setToken(tokenNew || '')

    }, [])

    useEffect(()=>{
        setErrors(false)
        if(token?.length){
            handleVerification();
        }
    }, [token])
    
  return (
      <div className='border flex flex-col min-h-screen items-center justify-center py-4'>
        <h2 className='text-4xl'> Verify Email</h2>
        <h3 className='p-2 bg-orange-300 text-black'>
            {token ? token : "no token found"}
        </h3>
        {
            isVerified ? <div>
                <h5 className='text-green-300'>Verified</h5>
                <Link href="/signin">Go to sign in</Link>
            </div> : null
        }

          {
              errors ? <div>
                  <h5 className='text-green-300'>Error is there</h5>
              </div> : null
          }

          
      </div>
  )
}
