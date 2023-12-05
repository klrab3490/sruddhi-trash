'use client';

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@lib/firebase.config";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminNav = () => {
    const router = useRouter();

    const[isLoggedIn,loading] = useAuthState(auth);
    useEffect(() => {
      if (!isLoggedIn) {
        router.push('/');
      }
    })

    // Logout
    const logout = async () => {
        await signOut(auth);
        router.push("/");
    };


    return (
        <div>
            <div className="w-full flex mb-2 pt-2 flex-center">
                <ul className="hidden sm:flex gap-4">
                    <li className="logo_text hover:text-gray-600">
                        <Link href="/admin" className="flex" >
                            <MdDashboard size={25} className="mr-1 inline-block"/>
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
                                    <Link href='/admin' className="p-1 inline-block self-center">
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
        </div>
    )
}

export default AdminNav;