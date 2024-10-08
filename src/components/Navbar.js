import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import DropdownMenu from './DropdownMenu';
// ICONS.
import { MdShoppingCart } from 'react-icons/md';

const Navbar = () => {

    const { user, handleLogout } = useContext(UserContext);
    const { cartItems } = useContext(CartContext);

    return (
        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    <span className="ml-3 text-xl">MS-COMMERCIAL</span>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-3">
                    {user ?
                        <>
                            <DropdownMenu userEmail={user?.email} logout={handleLogout} />
                            <Link to='/cart' className="hover:text-white font-medium relative">
                                <MdShoppingCart className='text-4xl' />
                                {cartItems.length !== 0 && <button className='absolute -top-3 left-4 text-base w-7 bg-blue-500 text-white rounded-full py-0.5'>{cartItems.length}</button>
                                }
                            </Link>
                        </>
                        :
                        <>
                            <Link to='/register' className="hover:text-white bg-gray-800 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded font-medium text-base">Sign Up</Link>
                            <Link to='/login' className="hover:text-white bg-gray-800 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded font-medium text-base">Sign In</Link>
                        </>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Navbar;