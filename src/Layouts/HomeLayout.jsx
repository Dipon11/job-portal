import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Header';
import HeroSection from '../Components/HeroSection';
import Test from '../Components/Test';
import Categories from '../Components/Categories';


import CastCarousel from '../Components/CastCarousel';
import EpisodeCarousel from '../Components/EpisodeCarousel';
import LocationCarousel from '../Components/LocationCarousel';

const HomeLayout = () => {
  return (
    <div>
      <header>


        <HeroSection></HeroSection>

      </header>

      <main className='bg-[#191D29] 
       '>

        <Outlet></Outlet>




      </main>
      <footer>

      </footer>
    </div>
  );
};

export default HomeLayout; 
