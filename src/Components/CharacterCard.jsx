// src/components/CharacterCard.jsx
import React from "react";
import { Link } from 'react-router-dom'; // Import Link

const CharacterCard = ({ character }) => {
  return (
    // Wrap the entire card with Link
    <Link to={`/character/${character.id}`}>
      <div
        // Base styles for small screens (default)
        className="relative w-[165px] h-[230px] sm:w-[240px] sm:h-[270px] md:w-[290px] md:h-[320px]" // Responsive width and height
        style={{
          // For large screens, these styles from the original code will apply due to md: prefix or by being the default
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
          background: "linear-gradient(to right, #84F729, #15BFFD)",
          borderRadius: "15px",
        }}
      >
        {/* Inner container */}
        <div
          className="absolute"
          style={{
            top: "1px",
            left: "1px",
            right: "1px",
            bottom: "1px",
            backgroundColor: "#1f2937",
            // Responsive clipPath. Note: calc() might need adjustment for pixel-perfect borders on smaller sizes if issues arise.
            // Consider simplifying the clip-path for smaller screens if this becomes too complex.
            clipPath: "polygon(0 0, 100% 0, 100% calc(85% - 1px), calc(85% - 1px) 100%, 0 100%)",
            borderRadius: "14px", // Outer border radius minus 1px
          }}
        >
          {/* Image */}
          <div className="flex justify-center pt-1 md:pt-2"> {/* Adjusted padding for smaller screens */}
            <img
              src={character.image}
              alt={character.name}
              // Responsive image size
              className="w-[138px] h-[176px] sm:w-[218px] sm:h-[216px] md:w-[258px] md:h-[256px] object-cover py-[10px] md:py-[15px] pt-[10px] md:pt-[15px] rounded-lg"
            />
          </div>

          {/* Name container */}
          <div
            className="flex items-center justify-start px-[8px] md:px-[10px]" // Adjusted padding
            style={{ height: "35px" }} // Slightly reduced height for name container on smaller screens, can be adjusted further
          >
            <h2 className="text-sm sm:text-base md:text-md font-semibold text-white text-start px-1 md:px-2"> {/* Responsive text size and padding */}
              {character.name}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;