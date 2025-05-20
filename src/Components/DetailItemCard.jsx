// src/components/DetailItemCard.jsx
import React from 'react';

const DetailItemCard = ({ label, value, labelColorClass = "text-green-300" }) => {
  return (
    <div
      className="relative mb-4 flex items-center justify-start p-1" // Added padding for border effect
      style={{
        width: "100%", // Take full width of parent
        minHeight: "60px", // Give some height to the card
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)", // The unique clip path
        background: "linear-gradient(to right, #84F729, #15BFFD)", // Gradient for the border
        borderRadius: "15px", // Rounded corners for the overall shape
      }}
    >
      {/* Inner container for content */}
      <div
        className="absolute inset-[1px] flex items-center justify-start px-4 py-2" // Inset by 1px to show border, padding for content
        style={{
          backgroundColor: "#1f2937", // Inner background color
          clipPath: "polygon(0 0, 100% 0, 100% calc(85% - 1px), calc(85% - 1px) 100%, 0 100%)", // Inner clip path, adjusted
          borderRadius: "14px", // Slightly smaller border radius for inner element
        }}
      >
        <p className="text-lg">
          <span className={`font-semibold ${labelColorClass}`}>{label}:</span> {value}
        </p>
      </div>
    </div>
  );
};

export default DetailItemCard;