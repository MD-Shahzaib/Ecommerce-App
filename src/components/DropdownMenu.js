import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// ICONS.
import { MdAccountCircle } from 'react-icons/md';

const DropdownMenu = ({ userEmail, logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <div className="relative inline-block text-left">
            <MdAccountCircle onClick={toggleMenu} className='text-3xl cursor-pointer hover:text-white' />
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div role="menuitem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b cursor-pointer">
                            <span>Signed in as</span><br />
                            <span className='font-medium'>{userEmail}</span><br />
                        </div>
                        <Link to="/profile" onClick={toggleMenu} role="menuitem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Your profile</Link>
                        <div onClick={logout} role="menuitem" className="block px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 hover:text-gray-900 cursor-pointer border-t">Sign out</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;