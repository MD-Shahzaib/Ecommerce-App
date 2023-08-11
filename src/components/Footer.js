import React from 'react'
import { Link } from 'react-router-dom';
// ICONS.
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-gray-400 bg-gray-900 body-font">
            <div className="container p-5 mx-auto flex items-center sm:flex-row flex-col">
                <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    <span className="ml-3 text-xl">MS-Commercial</span>
                </Link>
                <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2023 MD-Shahzaib</p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <Link to="/" className="ml-3 text-gray-400 text-xl"><FaFacebookF /></Link>
                    <Link to="/" className="ml-3 text-gray-400 text-xl"><FaTwitter /></Link>
                    <Link to="/" className="ml-3 text-gray-400 text-xl"><FaInstagram /></Link>
                    <Link to="/" className="ml-3 text-gray-400 text-xl"><FaLinkedinIn /></Link>
                </span>
            </div>
        </footer>
    )
}

export default Footer;