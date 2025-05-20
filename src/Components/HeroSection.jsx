import React from 'react';
import logo from '../assets/logo.png';
import portal from '../assets/portal.png';
import bgImage from '../assets/bg.png';
import bubble from '../assets/bubble.png'; // Ensure this import is correct
import { FaRegPlayCircle } from 'react-icons/fa';
import gun from '../assets/gun.png'
import { Link } from 'react-router';
import CastCarousel from './CastCarousel';
import EpisodeCarousel from './EpisodeCarousel';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen text-white bg-[#191D29] overflow-hidden">
      {/* Background Image with adjusted opacity and blend mode */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          opacity: 0.3,
          mixBlendMode: 'overlay',
        }}
      ></div>

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(217,217,217,0.05) 0%, rgba(25,29,41,0.8) 70%, rgba(25,29,41,1) 100%)`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">

        <Link to='/'>
          <img
            src={logo}
            alt="Logo"
            className="w-[177px] h-[41px] md:w-[257px] md:h-[48px] mt-10  mb-15 md:mb-[120px] md:mt-[58px]"
          />
        </Link>
        <div className='flex' style={{
          textShadow: `
      0px 0px 0px #9DFE00,  /* Reduced blur radius */
      0px 0px 2px #14D9E5, /* Slightly dimmer */
      0px 0px 68px rgba(20, 217, 229, 0.8) /* Added transparency */
    `,
        }}
        >
          <div className="flex flex-row items-start w-full px-4 sm:px-6 md:px-8">
            {/* Title Section - 80% */}
            <div className="w-[80%] md: flex flex-col justify-center">
              <h1 className="text-[28px] xs:text-[112px] sm:text-[118px] font-extrabold leading-tight">
                <div className="flex items-center gap-2 relative mb-2">
                  <span className="relative inline-block">
                    <img
                      src={bubble}
                      alt="Bubble"
                      className="absolute -top-6 -left-6 w-[60px] h-[60px] z-10  md:-top-23 md:-left-24 md:w-[214px] md:h-[214px] "
                    />
                    <span className="italic text-white relative z-20">THE</span>
                  </span>
                  <img
                    src={portal}
                    alt="Portal"
                    className="w-[40px] h-[30px] md:w-[224px] md:h-[145px]  animate-pulse mx-2"
                    style={{ transform: "translateY(-0%)" }}
                  />
                  <span className="bg-gradient-to-r from-[#15BFFD] to-[#84F729] bg-clip-text text-transparent">
                    RICK &
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-[#15BFFD] to-[#84F729] bg-clip-text text-transparent">
                    MORTY
                  </span>
                  <span className="italic text-white font-extrabold">WIKI</span>
                </div>
              </h1>
            </div>

            {/* Gun Section - 20% */}
            <div className="w-[20%] flex justify-center items-start relative">
              <div
                className="absolute w-[30px] h-[50px] md:w-[170px] md:h-[281px] bg-gradient-to-r from-[#9DFE00] via-[#14D9E5] to-[#14D9E5] rounded-[50px]"
                style={{
                  filter: "drop-shadow(0px 10px 30px rgba(20,217,229,0.5))",
                  zIndex: -1,
                  transform: "rotate(35deg)",
                }}
              ></div>

              <img
                src={gun}
                alt="Portal Gun"
                className="w-[90px] h-auto md:w-[318px] md:h-[179px] "
                style={{
                  filter: "drop-shadow(0px 5px 15px rgba(20,217,229,0.7))",
                }}
              />
            </div>
          </div>






        </div>





        {/* Buttons & Description */}
        <div className="flex flex-col-reverse   sm:flex-row  items-start md:items-center gap-4 mt-8">
          <Link to="https://www.youtube.com/watch?v=KQ9Cgdsa9tc" target="_blank" rel="noopener noreferrer">
            <button className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#9DFE00] to-[#14D9E5] px-6 rounded-full  p-2 md:py-4 md:font-medium">
              <FaRegPlayCircle /> Watch Now
            </button>
          </Link>
          <p className="text-sm md:w-[400px] text-[#14D9E5]  text-start">
            Brilliant but boozy scientist Rick hijacks his fretful teenage
            grandson, Morty, for wild escapades in other worlds and alternate
            dimensions.
          </p>
        </div>

        <CastCarousel></CastCarousel>


      </div>
      <EpisodeCarousel ></EpisodeCarousel>
    </div>
  );
};

export default HeroSection;
