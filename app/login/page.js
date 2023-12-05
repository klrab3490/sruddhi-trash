"use client";

import React, { useState } from 'react';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from '@lib/firebase.config';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { doc, getDoc } from 'firebase/firestore';
import Loader from '@components/loading';   
import squarelogo from '@public/square-logo.png'
import Image from 'next/image'
import Link from 'next/link';

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New state for tracking loading state
  

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true
        try {
            setPersistence(auth, browserSessionPersistence)
                .then(async () => {
                    return await signInWithEmailAndPassword(auth, email, password)
                        .then(async (userCredential) => {
                            const user = userCredential.user;
                            const docRef = doc(db, "Users", user.uid);
                            const docSnap = await getDoc(docRef);
                            if (docSnap.exists()) {
                                const userData = docSnap.data();
                                const userType = userData.usertype;
                                if (userType === "Admin") {
                                    router.push('/admin');
                                } else if (userType === "User") {
                                    router.push('/users');
                                }
                                setIsLoggedIn(true);
                            }
                        })
                        .catch(async (error) => {
                            setError(true);
                        })
                        .finally(() => {
                            setIsLoading(false); // Set loading state to false after login attempt
                        });
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log("try error");
        }
    };

    const loginwithGoogle = async () => {
        setIsLoading(true); // Set loading state to true
        setPersistence(auth, browserSessionPersistence)
            .then(async () => {
                return await signInWithPopup(auth, provider)
                    .then(async (userCredential) => {
                        const user = userCredential.user;
                        const docRef = doc(db, "Users", user.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            const userType = userData.usertype;
                            setUserType(userType);
                            if (userType === "Admin") {
                                router.push('/admin');
                            } else if (userType === "User") {
                                router.push('/users');
                            }
                            setIsLoggedIn(true);
                        }
                    })
                    .catch(async (error) => {
                        setError(true);
                    })
                    .finally(() => {
                        setIsLoading(false); // Set loading state to false after login attempt
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Conditional rendering based on the login and loading states
    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        );
    } else if (isLoggedIn) {
        return (
            <div>
                <Loader />
            </div>
        );
    } else {
        return (
            <div className='login'>
                <center className='p-10'>
                    <div className='text-5xl flex-center'>
                        <p className=''>Sruddthi Trash - Login</p>
                        <Image src={squarelogo} alt="App Logo" height={200} width={200} />
                    </div>
                <form onSubmit={handleLogin} className='p-2'>
                    <div className='form'>
                        <div className='formInput'>
                            <label className='label'>Email ID : </label>
                            <input className='input' type='email' placeholder='Enter Email ID' onChange={(e) => setEmail(e.target.value)} className='text-black bg-white' />    
                        </div>
                        <div className='formInput'>
                            <label className='label'>Password : </label>
                            <input className='input' type='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} className='text-black bg-white' />    
                        </div>
                    </div>
                    <div className='gap-2'>
                        <button type='submit' className='bg-green-600 text-white hover:bg-white hover:text-green-600'> Login </button>
                    </div>
                    {error && <span>Wrong Email Or Password</span>}
                    <div className='gap-2'>
                        <Link href='/register' className='bg-blue-600 text-white'> Register </Link>
                    </div>
                </form>
                </center>
            </div>
        );
    }
};

export default LoginPage;