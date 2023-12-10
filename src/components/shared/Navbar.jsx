import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const navLinks = <>
        <li  className='text-xl font-normal'><Link to={"/"}>Home</Link></li>
        <li  className='text-xl font-normal'><Link to={"/Destinations"}>Destinations</Link></li>
        <li  className='text-xl font-normal'><Link to={"/tours"}>Tours</Link></li>
        <li  className='text-xl font-normal'><Link to={"/dashboard"}>Dashboard</Link></li>
        <li  className='text-xl font-normal'><Link to={"/about"}>About</Link></li>
        <li  className='text-xl font-normal'><Link to={"/signUp"}>Sign up</Link></li>

    </>

    return (
        <div>
            <div className="navbar bg-[#47FC22] w-full px-10">
                <div className="navbar-start text-white">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu text-[#0845F4] font-semibold rounded-xs menu-md dropdown-content bg-white mt-3 z-[1] p-2 shadow-xl w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="font-lato block text-left cursor-pointer" href='/'>
                        <h1 className='text-5xl font-extrabold italic'>TravelBeyond</h1>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu text-white font-bold menu-horizontal px-1 space-x-3">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-outline font-btn hover:bg-[#47FC22] border-white">Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;