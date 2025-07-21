import React from 'react';
import { Home, Users, Gamepad2, Newspaper, Mail, Menu, X } from 'lucide-react';
import { clubInfo } from '@/data/clubInfo';

interface NavbarProps {
    navigateTo: (page: string, gameId?: string | null) => void;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ navigateTo, isMobileMenuOpen, setIsMobileMenuOpen }: NavbarProps) {
    const navItems = [
        { label: 'ホーム', page: 'home', icon: <Home size={18} /> },
        { label: 'CGPについて', page: 'about', icon: <Users size={18} /> },
        { label: 'ゲーム一覧', page: 'games', icon: <Gamepad2 size={18} /> },
        { label: 'ニュース', page: 'news', icon: <Newspaper size={18} /> },
        { label: 'お問い合わせ', page: 'contact', icon: <Mail size={18} /> },
    ];

    return (
        <header className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
                    <img src={clubInfo.logoUrl} alt={`${clubInfo.shortName} ロゴ`} className="h-8 mr-2" />
                    <span className="font-bold text-red-600">{clubInfo.name}</span>
                </div>
                <nav className="hidden md:flex space-x-2">
                    {navItems.map(item => (
                        <button
                            key={item.page}
                            onClick={() => navigateTo(item.page)}
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-200 flex items-center"
                        >
                            {item.icon && React.cloneElement(item.icon, { className: "mr-1.5" })}
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-700 hover:text-red-600 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute w-full">
                    <nav className="flex flex-col p-2 space-y-1">
                        {navItems.map(item => (
                            <button
                                key={item.page}
                                onClick={() => navigateTo(item.page)}
                                className="px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-200 flex items-center w-full text-left"
                            >
                                {item.icon && React.cloneElement(item.icon, { className: "mr-2" })}
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
