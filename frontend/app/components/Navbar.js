'use client'
import Link from 'next/link';
import { useUser } from '@civic/auth/react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { user } = useUser();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('/');

    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setActiveTab(savedTab);
        } else {
            setActiveTab(pathname);
        }
    }, [pathname]);

    const handleTabClick = (path) => {
        localStorage.setItem('activeTab', path);
        setActiveTab(path);
        setMobileMenuOpen(false);
    };

    const navItems = [
        { label: 'App', href: '/app' },
        { label: 'Marketplace', href: '/marketplace' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'CO2 Saved', href: '/carbon' },
    ];

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
                            {navItems.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => handleTabClick(item.href)}
                                    className={`px-1 py-2 border-b-2 text-sm font-medium transition-colors duration-300 ${
                                        activeTab === item.href
                                            ? 'border-green-500 text-white'
                                            : 'border-transparent text-green-200 hover:text-white hover:border-green-300'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
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
                        {user && (
                            <button
                                className="relative overflow-hidden group inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-green-800 bg-green-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ml-2"
                                onClick={async () => {
                                    await fetch('/api/auth/session', { method: 'DELETE' });
                                    window.location.href = '/login';
                                }}
                            >
                                Log Out
                            </button>
                        )}
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
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => handleTabClick(item.href)}
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                activeTab === item.href
                                    ? 'text-white bg-green-800'
                                    : 'text-green-200 hover:text-white hover:bg-green-600'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
