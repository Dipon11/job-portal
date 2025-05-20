// src/page/CastPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard'; // Adjust the path if necessary
import bgImage from '../assets/bg2.png'; // Import your background image
import logo from '../assets/logo.png'; // Import your logo image
import { Link } from 'react-router-dom'; // Import Link for the logo

const CastPage = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(res => setCharacters(res.data.results))
      .catch(err => console.error(err));
  }, []);

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

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(217,217,217,0.05) 0%, rgba(25,29,41,0.8) 70%, rgba(25,29,41,1) 100%)`,
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 p-8">
        {/* Logo as Header */}
        <div className="flex justify-center mb-10 mt-5">
          <Link to='/'>
            <img
              src={logo}
              alt="Rick and Morty Logo"
              className="w-[227px] h-[48px]"
            />
          </Link>
        </div>

        <h1 className="text-3xl font-medium mb-6 text-[#14D9E5] text-center  md:ml-10 md:text-start md:text-5xl">The Cast </h1>
        {/* Reduced gap from gap-6 to gap-4 or even gap-2 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-items-center">
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastPage;