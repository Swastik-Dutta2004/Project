"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Search, User } from 'lucide-react' // Assuming you use lucide-react, otherwise use your SVGs

const Navbar = () => {
    const pathname = usePathname();

    // Link styling helper to keep the JSX clean
    const navLinkClasses = (path: string) => `
        relative py-1 text-sm font-medium transition-colors duration-200
        ${pathname === path 
            ? "text-primary after:absolute after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-primary" 
            : "text-muted-foreground hover:text-primary"}
    `;

    return (
        <nav className='sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-border'>
            
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="10" width="20" height="12" rx="2" />
                        <path d="M6 10V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
                    </svg>
                </div>
                <h2 className="text-xl font-black tracking-tighter text-foreground uppercase">
                    Bus<span className="text-primary">TiFY</span>
                </h2>
            </div>

            {/* Search Bar - Centered & Functional */}
            <div className='hidden md:flex flex-1 max-w-md mx-10'>
                <div className='relative w-full group'>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search routes (e.g. S-24, Esplanade)"
                        className='w-full bg-secondary/50 hover:bg-secondary focus:bg-background border border-transparent focus:border-primary rounded-full pl-10 pr-4 py-2 text-sm transition-all outline-none text-foreground placeholder:text-muted-foreground'
                    />
                </div>
            </div>

            {/* Navigation Links */}
            <div className='flex gap-8 items-center'>
                <div className="hidden lg:flex items-center gap-6">
                    <Link href="/" className={navLinkClasses("/")}>Home</Link>
                    <Link href="/passengers" className={navLinkClasses("/passengers")}>Passengers</Link>
                    <Link href="/conductor" className={navLinkClasses("/conductor")}>Conductor</Link>
                    <Link href="/about" className={navLinkClasses("/about")}>About</Link>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3 border-l border-border pl-6">
                    <button className='hidden sm:block text-sm font-semibold text-foreground hover:text-primary transition-colors'>
                        Sign in
                    </button>
                    <button className='px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-sm hover:opacity-90 transition-all active:scale-95'>
                        Get Ticket
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar 