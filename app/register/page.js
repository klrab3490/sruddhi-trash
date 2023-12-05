'use client';

import { auth, db } from '@lib/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImUserPlus } from "react-icons/im";
import Image from 'next/image';
import squarelogo from '@public/square-logo.png';

const page = () => {
    const [data,setData] = useState({});
    const router = useRouter();

    const userInputs = [
        {id:"name", label:"Name : ", type:"text", placeholder:"Enter Full Name"}, 
        {id:"email", label:"Email ID : ", type:"email", placeholder:"Enter Email ID"}, 
        {id:"password", label:"Password : ", type:"password", placeholder:"Enter Password"}, 
    ];

    const handleInputs = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value;
        setData({...data, [id]:value})
    };

    // console.log(data);

    const handleAdd = async(e) => {
        e.preventDefault();
        try {
        const result = await createUserWithEmailAndPassword(auth,data.email,data.password);
        await setDoc(doc(db,"Users",result.user.uid),{
            ...data,
            usertype: "User",
            timeStamp: serverTimestamp()
        });
        router.push("/");
        } catch (error) { 
        console.log(error);
        }
    }

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <center>
                        <div className='text-5xl flex-center'>
                            <p className=''>Sruddthi Trash - Login</p>
                            <Image src={squarelogo} alt="App Logo" height={200} width={200} />
                        </div>
                    </center>
                </div>
                <center>
                    <div className="bottom">
                        <div className="left flex-center">
                            <ImUserPlus size={100} className='' />
                        </div>
                        <div className="right">
                            <form onSubmit={handleAdd}>
                            <div className="form">
                                {userInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label className='label'>{input.label}</label>
                                    <input className='input' id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInputs} className="text-black bg-white" />
                                </div>
                                ))}
                            </div>
                            <div className="p-2 flex-center">
                                <button type='submit' className='mt-2 font-bold p-4 bg-teal-500 text-white' > Send </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </center>
            </div>
        </div>
    );
};

export default page;