"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'


const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className='flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200'>
            <div className="text-2xl font-bold text-gray-900">
                <h2>BusTiFY</h2>
            </div>

            <div className='flex-1 mx-8'>
                <div className='flex items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-300'>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search destinations or activities"
                        className='flex-1 bg-transparent outline-none text-sm text-gray-700'
                    />
                </div>
            </div>

            <div className='flex gap-8 items-center'>

                <Link href="/" className={`text-gray-700 hover:text-amber-500 font-medium transition border-b-2 transition-all duration-300 ${pathname === "/" ? "border-amber-500" : "border-transparent"
                    }`}
                >Home</Link>

                <Link href="/passengers" className={`text-gray-700 hover:text-amber-500 font-medium transition border-b-2 transition-all duration-300 ${pathname === "/passengers" ? "border-amber-500" : "border-transparent"
                    }`}
                >Passengers</Link>

                <Link href="/conductor" className={`text-gray-700 hover:text-amber-500 font-medium transition border-b-2 transition-all duration-300 ${pathname === "/conductor" ? "border-amber-500" : "border-transparent"}`}
                >Conductor</Link>

                <Link
                    href="/about"
                    className={`text-gray-700 hover:text-amber-500 font-medium transition border-b-2 transition-all duration-300 ${pathname === "/about" ? "border-amber-500" : "border-transparent"
                        }`}
                >
                    About
                </Link>

                <button className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition'>
                    Sign up
                </button>

                <button className='w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white hover:bg-amber-600 transition'>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </button>
            </div>
        </nav>
    )
}

export default Navbar