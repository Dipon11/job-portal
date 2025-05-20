import React from "react";

const EpisodeCard = ({ episode }) => {
  return (
    <div
      className="relative w-full max-w-[340px] h-[96px] sm:h-[96px]"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
        background: "linear-gradient(to right, #84F729, #15BFFD)",
      }}
    >
      <div
        className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] bg-gray-800 flex items-center px-2 sm:px-4"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(70% - 1px), calc(70% - 1px) 100%, 0 100%)",
        }}
      >
        <div className="mr-2 sm:mr-4">
          <h3 className="text-xs sm:text-sm font-semibold text-white">{episode.episode}</h3>
          <h4 className="text-sm sm:text-lg font-medium text-white">{episode.name}</h4>
        </div>
      </div>
    </div>

  );
};

export default EpisodeCard;