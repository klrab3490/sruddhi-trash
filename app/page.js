import Image from 'next/image'
import logo from "@public/logo.png"
import Link from 'next/link'

export default function Home() {
    return (
        <main>
            <div>
                <center className='text-5xl p-10'>
                    <p className='mb-3'>Sruddthi Trash</p>
                    <Image src={logo} alt="App Logo" width={300} height={300} />
                    <div className='mt-5' >
                        <Link href="/register" className='outline rounded px-2 text-black hover:bg-black hover:text-white mr-6'> Register</Link>
                        <Link href="/login" className='outline rounded px-2 text-black hover:bg-black hover:text-white'>Login </Link>
                    </div>
                </center>
            </div>
        </main>
    )
}
