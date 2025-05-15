import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-2">
        <img className="w-[40px] h-[40px]" src={logo} alt="Logo" />
        <p className="text-2xl font-bold text-[#11009E]">
          Job <span className="text-[#4942E4]">Portal</span>
        </p>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex justify-center">
        <ul className="menu menu-horizontal px-1 gap-5">
          <li><a className="hover:underline ">Home</a></li>
          <li><a className="hover:underline">Jobs</a></li>
          <li tabIndex={0}>
            <details>
              <summary className="hover:underline cursor-pointer">Sectors</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><a href="#it-engineering" className="hover:underline">IT/Engineering</a></li>
                <li><a href="#business-management" className="hover:underline">Business Management</a></li>
                <li><a href="#healthcare" className="hover:underline">Healthcare</a></li>
                <li><a href="#education" className="hover:underline">Education</a></li>
                <li><a href="#hospitality" className="hover:underline">Hospitality</a></li>
              </ul>
            </details>
          </li>
          <li><a className="hover:underline">Contact</a></li>
        </ul>
      </div>


      {/* Navbar End */}
      <div className="navbar-end hidden lg:flex gap-5">
        <button className="btn bg-[#11009E] text-white font-medium text-sm">Log In</button>
        <button className="btn bg-[#4942E4] text-white font-medium text-sm">Register</button>
      </div>

      {/* Mobile Dropdown */}
      <div className="navbar-end dropdown lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a>Home</a></li>
          <li><a>Jobs</a></li>
          <li tabIndex={0}>
            <details>
              <summary>Sectors</summary>
              <ul className="p-2">
                <li><a href="#it-engineering">IT/Engineering</a></li>
                <li><a href="#business-management">Business Management</a></li>
                <li><a href="#healthcare">Healthcare</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#hospitality">Hospitality</a></li>
              </ul>
            </details>
          </li>
          <li><a>Contact</a></li>
          <li><a className="btn bg-[#11009E] text-white w-full font-medium text-sm mt-5 mb-3">Log In</a></li>
          <li><a className="btn bg-[#4942E4] text-white w-full font-medium text-sm">Register</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
