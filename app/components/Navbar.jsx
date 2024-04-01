"use client"
import Link from 'next/link'

export default function Navbar() {
    return (
    <header className="w-full py-6">
        <nav className="w-full h-[100px] flex justify-between items-center px-28 py-4 ">
            <div className="text-logo-color text-4xl font-extrabold items-center">Travelog</div>
            <div className="flex space-x-20 text-xl font-medium justify-between items-center">
                <Link href="/">
                    HOME
                </Link>
                <Link href="/about">
                    ABOUT US
                </Link>
                <Link href="/Blog">
                    BLOG
                </Link>
                
                <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="border border-logo-color rounded-full py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
                <Link href="/login">
                <button className="text-l text-white bg-logo-color py-2 px-4 rounded-full">
                    Login
                </button>
                </Link>
            </div>
        </nav>
    </header>
    )
  }
  

  //Home
  //About us
  //BLog
  //Search bar
  // login
//sign in ve sign up yerine login