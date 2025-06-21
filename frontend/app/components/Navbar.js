'use client'
import Link from 'next/link';
import { useUser } from '@civic/auth/react';
import { useState } from 'react';

export default function Navbar() {
    const { user } = useUser();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-green-800 bg-opacity-90 backdrop-blur-md sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <div className="flex-shrink-0 flex items-center">
                                <svg className="h-8 w-8 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="ml-2 text-xl font-bold text-white">AgriLink</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Tabs - Desktop */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            <Link href="/app" className="px-1 py-2 border-b-2 border-green-500 text-sm font-medium text-white">
                                App
                            </Link>
                            <Link href="/marketplace" className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-green-200 hover:text-white hover:border-green-300 transition-colors duration-300">
                                Marketplace
                            </Link>
                            <Link href="/portfolio" className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-green-200 hover:text-white hover:border-green-300 transition-colors duration-300">
                                Portfolio
                            </Link>
                            <Link href="/carbon" className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-green-200 hover:text-white hover:border-green-300 transition-colors duration-300">
                                CO2 Saved
                            </Link>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <span className="text-green-200">
                                Welcome, {user?.name || user?.email || 'Farmer'}
                            </span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors duration-300">
                            <span className="text-sm font-medium text-white">
                                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'F'}
                            </span>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-green-200 hover:text-white hover:bg-green-700 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700 bg-opacity-90">
                    <Link 
                        href="/app" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-800"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        App
                    </Link>
                    <Link 
                        href="/marketplace" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-green-200 hover:text-white hover:bg-green-600"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Marketplace
                    </Link>
                    <Link 
                        href="/portfolio" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-green-200 hover:text-white hover:bg-green-600"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Portfolio
                    </Link>
                    <Link 
                        href="/carbon" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-green-200 hover:text-white hover:bg-green-600"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        CO2 Saved
                    </Link>
                </div>
            </div>
        </nav>
    );
}