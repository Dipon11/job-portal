// src/pages/CharacterDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import bgImage from '../assets/bg3.png';
import DetailItemCard from '../Components/DetailItemCard';

// Import icons (assuming you have react-icons installed)
import { FaHeart, FaGlobe, FaMars, FaMapMarkerAlt, FaList } from 'react-icons/fa';


const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);

        const episodeUrls = response.data.episode;
        const episodeIds = episodeUrls.map(url => url.split('/').pop()).join(',');
        const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
        const episodesData = Array.isArray(episodeResponse.data) ? episodeResponse.data : [episodeResponse.data];
        setEpisodes(episodesData.map(ep => ep.name));
      } catch (err) {
        console.error("Error fetching character details:", err);
        setError("Failed to load character details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#191D29] text-white">
        Loading character...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#191D29] text-red-400">
        {error}
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#191D29] text-white">
        Character not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white bg-[#191D29] overflow-y-auto">
      {/* Background Image */}
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
      <div className="relative z-10 p-4 sm:p-8 flex flex-col items-center">
        {/* Logo as Header */}
        <div className="flex justify-center mb-6 mt-4 sm:mb-10 sm:mt-5"> {/* Adjusted margins for small screens */}
          <Link to='/'>
            <img
              src={logo}
              alt="Rick and Morty Logo"
              className="w-[180px] h-[38px] sm:w-[227px] sm:h-[48px]" // Smaller logo on small screens
            />
          </Link>
        </div>

        {/* Outer container for the main character details with gradient border */}
        <div className="relative w-full max-w-7xl rounded-[15px] p-[2px]">
          {/* Inner container for actual content, with solid background */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 rounded-xl p-4 sm:p-6 md:p-10"> {/* Adjusted padding and gap for responsiveness */}
            {/* Character Image Section - Remains flex-col, shrinks for smaller screens */}
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center
            bg-gradient-to-r from-[#84F729] to-[#15BFFD]
            bg-clip-text text-transparent">
                {character.name}
              </h1>
              <div class="w-[200px] h-[200px] md:w-[400px] md:h-[400px] border border-transparent bg-gradient-to-r from-[#84F729] to-[#15BFFD] rounded-lg p-[2px]">
                <div class="h-full w-full md:h-full md:w-full bg-gray-800 flex justify-center items-center rounded-md">
                  <img
                    src={character.image}
                    alt={character.name}
                    class="w-[140px] h-[140px]  md:w-[258px] md:h-[256px] object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Character Details - Details will shrink for small screens */}
            <div className="space-y-4 text-sm sm:text-base mt-4 md:mt-0"> {/* Added responsive top margin to push down on small screens if image section is on top */}

              {/* Row 1: Status, Species, Gender */}
              <div className="flex md:flex-wrap justify-center sm:justify-start gap-4">
                {/* Status Card */}
                <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#84F729] to-[#15BFFD]
              w-full min-[400px]:w-[calc(35%-8px)] md:w-auto md:flex-grow"> {/* Responsive widths for wrapping */}
                  <div className="p-3 sm:p-4 rounded-md bg-[#1f2937] h-full flex flex-col justify-between"> {/* Added flex-col and justify-between for internal alignment */}
                    <FaHeart className="mb-2 sm:mb-3 text-2xl sm:text-4xl text-green-400" /> {/* Responsive icon size */}
                    <div className="text-white-400 font-thin text-base sm:text-xl mb-1 sm:mb-2">Status</div> {/* Responsive text size */}
                    <div className="text-white font-medium text-2xl sm:text-4xl">{character.status}</div> {/* Responsive text size */}
                  </div>
                </div>

                {/* Species Card */}
                <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#84F729] to-[#15BFFD]
              w-full min-[400px]:w-[calc(35%-8px)] md:w-auto md:flex-grow">
                  <div className="p-3 sm:p-4 rounded-md bg-[#1f2937] h-full flex flex-col justify-between">
                    <FaGlobe className="mb-2 sm:mb-3 text-3xl sm:text-4xl text-cyan-400" /> {/* Adjusted icon color from green to cyan */}
                    <div className="text-white-400 font-thin text-base sm:text-xl mb-1 sm:mb-2">Species</div>
                    <div className="text-white font-medium text-2xl sm:text-4xl">{character.species}</div>
                  </div>
                </div>

                {/* Gender Card */}
                <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#84F729] to-[#15BFFD]
              w-full min-[400px]:w-[calc(35%-8px)] md:w-auto md:flex-grow">
                  <div className="p-3 sm:p-4 rounded-md bg-[#1f2937] h-full flex flex-col justify-between">
                    <FaMars className="mb-2 sm:mb-3 text-3xl sm:text-4xl text-yellow-400" /> {/* Adjusted icon color from green to yellow */}
                    <div className="text-white-400 font-thin text-base sm:text-xl mb-1 sm:mb-2">Gender</div>
                    <div className="text-white font-medium text-2xl sm:text-4xl">{character.gender}</div>
                  </div>
                </div>
              </div>

              {/* Row 2: Origin */}
              <div className="p-[2px] w-full rounded-lg mt-4 md:mt-[40px] bg-gradient-to-r from-[#84F729] to-[#15BFFD]"> {/* mt-[40px] only on md screens and up */}
                <div className="p-3 sm:p-4 rounded-md bg-[#1f2937] h-full"> {/* Adjusted padding */}
                  <div className="flex flex-col text-sm font-medium text-white">
                    <FaGlobe className="mr-2 mb-2 sm:mb-3 text-3xl sm:text-4xl text-green-400" /> {/* Responsive icon size */}
                    <p className='text-white-400 font-thin text-base sm:text-xl mb-1 sm:mb-2'>Origin</p> {/* Responsive text size */}
                  </div>
                  <div className="text-white font-medium text-2xl sm:text-4xl">{character.origin.name}</div> {/* Responsive text size */}
                </div>
              </div>

              {/* Row 3: Last Known Location */}
              <div className="p-[2px] w-full rounded-lg mt-4 md:mt-[40px] bg-gradient-to-r from-[#84F729] to-[#15BFFD]"> {/* mt-[40px] only on md screens and up */}
                <div className="p-3 sm:p-4 rounded-md bg-[#1f2937] h-full"> {/* Adjusted padding */}
                  <div className="flex flex-col text-sm font-medium text-white">
                    <FaMapMarkerAlt className="mr-2 mb-2 sm:mb-3 text-3xl sm:text-4xl text-green-400" /> {/* Responsive icon size */}
                    <p className='text-white-400 font-thin text-base sm:text-xl mb-1 sm:mb-2'>Last Known Location</p> {/* Responsive text size */}
                  </div>
                  <div className="text-white font-medium text-2xl sm:text-4xl">{character.location.name}</div> {/* Responsive text size */}
                </div>
              </div>

              {/* Row 4: Episodes */}
              <div className="p-[2px] w-full rounded-lg mt-4 bg-gradient-to-r from-[#84F729] to-[#15BFFD]">
                <div className="p-3 sm:p-4 rounded-md bg-[#1f2937] h-full"> {/* Adjusted padding */}
                  <div className="flex flex-col font-light text-white mb-2 sm:mb-3 mt-2">
                    <FaList className="mr-2 mb-2 sm:mb-3 text-4xl sm:text-5xl text-green-400" /> {/* Responsive icon size */}
                    <p className='text-white-400 font-thin text-base sm:text-xl mb-1 sm:mb-2'>Episode(s)</p> {/* Responsive text size */}
                  </div>
                  <ul className="list-disc list-inside text-white font-medium text-xl sm:text-4xl max-h-[160px] overflow-y-auto pr-2 custom-scrollbar"> {/* Responsive text size */}
                    {/* Assuming 'episodes' is a state or prop that holds episode names. Keeping slice(0,5) for demo */}
                    {character.episode.slice(0, 5).map((ep, idx) => (
                      <li key={idx}>Episode {ep.split("/").pop()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link to="/cast" className="mt-6 sm:mt-8 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#9DFE00] to-[#14D9E5] text-[#191D29] font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg text-sm sm:text-base"> {/* Responsive padding and text size */}
          Back to Cast
        </Link>
      </div>
    </div>
  );
};

export default CharacterDetailPage;     