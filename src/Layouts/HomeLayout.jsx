import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Header';
import HeroSection from '../Components/HeroSection';
import Test from '../Components/Test';
import Categories from '../Components/Categories';
import Footer from '../Components/Footer';

const HomeLayout = () => {
  return (
    <div>
      <header>
        <Header></Header>
        <section>
          <HeroSection></HeroSection>
        </section>
      </header>

      <main className='max-w-7xl mx-auto'>
        <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
          <Categories></Categories>
        </Suspense>
        <Outlet></Outlet>

      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout; 
