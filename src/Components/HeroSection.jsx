import React from 'react';
import CountUp from 'react-countup';
import banner from '../assets/banner.jpg'
import { FaIndustry, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router';

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-[90vh]"
      style={{ backgroundImage: `url(${banner})` }}
    >


      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
        style={{ backgroundColor: "rgba(73, 66, 228, 0.5)" }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
          The <span className="text-[#11009E]">#1 Job Board</span> for <br />
          Hiring or Find your next job
        </h1>
        <p className="text-white mb-6 max-w-2xl">
          Each month, more than 3 million job seekers turn to website in their search for work,
          making over 140,000 applications every single day
        </p>


        {/* Search Form */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl p-4 gap-2 shadow-lg w-full max-w-4xl">
          <div className="flex items-center w-full md:w-1/3 gap-2">
            <FaIndustry className="text-gray-500" />
            <select className="select select-bordered w-full">
              <option disabled selected>Industry</option>

              <option>Software Development</option>
              <option>Finance</option>
              <option>HealthCare</option>
              <option>Clean Energy</option>
              <option>Education Technology</option>
            </select>
          </div>

          <div className="flex items-center w-full md:w-1/3 gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <select className="select select-bordered w-full">
              <option disabled selected>Location</option>
              <option>Dhaka</option>
              <option>London</option>
              <option>New York</option>
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Your keyword..."
              className="input input-bordered w-full"
            />
          </div>

          <NavLink to={'/category'} className="btn bg-blue-600 hover:bg-blue-700 text-white mt-2 md:mt-0 md:ml-2">
            <FaSearch className="mr-2" /> Search
          </NavLink>
        </div>

        {/* Popular Searches */}
        <div className="mt-6 text-white text-sm md:text-base">
          <span className="font-semibold">Popular Searches:</span>
          <span className="ml-2 space-x-2">
            <a href="#" className="hover:underline">Software Devolopment</a>
            <a href="#" className="hover:underline">Finace</a>
            <a href="#" className="hover:underline">IOS</a>
            <a href="#" className="hover:underline">Developer</a>
            <a href="#" className="hover:underline">PHP</a>
            <a href="#" className="hover:underline">Senior</a>
            <a href="#" className="hover:underline">Engineer</a>
          </span>
        </div>


        {/* Stats */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-white text-center">
          <div>
            <h2 className="text-2xl font-bold">
              <CountUp end={265000} duration={5} separator="," />+
            </h2>
            <p>Daily Jobs Posted</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              <CountUp end={17000} duration={7} separator="," />+
            </h2>
            <p>Recruiters</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              <CountUp end={17000} duration={2} separator="," />+
            </h2>
            <p>Freelancers</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              <CountUp end={28000} duration={6} separator="," />+
            </h2>
            <p>Blog Tips</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
