'use client';

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/firebase.config";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "firebase/auth";
import squarelogo from "@public/square-logo.png";
import Image from "next/image";


const UserNav = () => {
    const router = useRouter();

    const [isLoggedIn, loading] = useAuthState(auth);
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    // Logout
    const logout = async () => {
        await signOut(auth);
        router.push("/");
    };

    return (
        <div className="flex-center flex-col h-screen">
            <div className='text-5xl flex-center mb-6'>
                <p className=''>Sruddthi Trash - User</p>
                <Image src={squarelogo} alt="App Logo" height={200} width={200} />
            </div>
            <center>
                <div className="flex-center mb-6">
                    <ul className="hidden sm:flex gap-4">
                        <li className="logo_text hover:text-gray-600">
                            <Link href="/users" className="flex">
                                <MdDashboard size={25} className="mr-1 inline-block" />
                                Dashboard
                            </Link>
                        </li>
                        <li className="logo_text hover:text-gray-600">
                            <button className="flex" onClick={logout}>
                                <AiOutlineLogout size={25} className='mr-1 inline-block' />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="w-full">
                    <div className="w-full flex mb-1 pt-1 items-center justify-center">
                        <ul className="flex sm:hidden gap-4 font-satoshi font-semibold text-l text-black tracking-wide">
                            <div className="flex-col p-1">
                                <li className="flex">
                                    <center>
                                        <Link href='/users' className="p-1 inline-block self-center">
                                            <MdDashboard size={25} className="mr-1 inline-block" />
                                            Dashboard
                                        </Link>
                                    </center>
                                </li>
                                <li className="flex">
                                    <center>
                                        <button className="flex" onClick={logout}>
                                            <AiOutlineLogout size={25} className='mr-1 inline-block' /> Logout
                                        </button>
                                    </center>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default UserNav;
