import React from "react";

const LocationCard = ({ location }) => {
  return (
    <div
      className="relative"
      style={{
        width: "340px",
        height: "96px",
        clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
        background: "linear-gradient(to right, #84F729, #15BFFD)",
      }}
    >
      <div
        className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] bg-gray-800 flex flex-col justify-center px-4"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(70% - 1px), calc(70% - 1px) 100%, 0 100%)",
        }}
      >
        <div>
          <h3 className="text-lg font-medium text-white">
            #{location.id}
          </h3>
          <h4 className="text-xl font-medium text-white">{location.name}</h4>
        </div>

      </div>
    </div>
  );
};

export default LocationCard;