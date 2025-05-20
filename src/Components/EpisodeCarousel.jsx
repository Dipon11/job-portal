import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import EpisodeCard from "./EpisodeCard";
import LocationCarousel from "./LocationCarousel";
import backgroundImage from "../assets/Spiral Element.png";

const GAP = 16;

const BREAKPOINT_CONFIGS = {
  xs: {
    minScreenWidth: 0,
    cardWidth: 300,
    cardHeight: 96,
    visibleCardsInViewport: 2,
    cardsToScrollBy: 1,
  },
  md: {
    minScreenWidth: 768,
    cardWidth: 350,
    cardHeight: 96,
    visibleCardsInViewport: 3.5,
    cardsToScrollBy: 2,
  },
};

const getCurrentBreakpointConfig = () => {
  if (typeof window === 'undefined') return BREAKPOINT_CONFIGS.md;
  const screenWidth = window.innerWidth;
  return screenWidth >= BREAKPOINT_CONFIGS.md.minScreenWidth ? BREAKPOINT_CONFIGS.md : BREAKPOINT_CONFIGS.xs;
};

const calculateMaskWidth = (config) => {
  return config.cardWidth * config.visibleCardsInViewport + GAP * (config.visibleCardsInViewport - 1);
};

const calculateScrollDistance = (config) => {
  return config.cardWidth * config.cardsToScrollBy + GAP * (config.cardsToScrollBy - 1);
};

const EpisodeCarousel = () => {
  const [episodes, setEpisodes] = useState([]);
  const scrollRef = useRef(null);

  const [currentConfig, setCurrentConfig] = useState(getCurrentBreakpointConfig());
  const [maskWidth, setMaskWidth] = useState(() => calculateMaskWidth(getCurrentBreakpointConfig()));
  const [scrollAmount, setScrollAmount] = useState(() => calculateScrollDistance(getCurrentBreakpointConfig()));

  const [isLeftArrowDisabled, setIsLeftArrowDisabled] = useState(true);
  const [isRightArrowDisabled, setIsRightArrowDisabled] = useState(true);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/episode")
      .then(res => setEpisodes(res.data.results.slice(0, 10)))
      .catch(console.error);
  }, []);

  const updateArrowStates = useCallback(() => {
    if (!scrollRef.current || episodes.length === 0) {
      setIsLeftArrowDisabled(true);
      setIsRightArrowDisabled(true);
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsLeftArrowDisabled(scrollLeft <= 1);
    setIsRightArrowDisabled(scrollLeft >= scrollWidth - clientWidth - 1);
  }, [episodes.length]);

  useEffect(() => {
    const handleResize = () => {
      const newConfig = getCurrentBreakpointConfig();
      setCurrentConfig(newConfig);
      setMaskWidth(calculateMaskWidth(newConfig));
      setScrollAmount(calculateScrollDistance(newConfig));
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updateArrowStates();
    const timer = setTimeout(updateArrowStates, 100);
    return () => clearTimeout(timer);
  }, [episodes, maskWidth, updateArrowStates]);

  const scrollPage = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative md:my-10 px-2 sm:px-4  max-w-7xl mx-auto">
      {/* Background Image */}
      <div
        className="absolute top-0 right-0 h-full w-1/2 bg-cover bg-no-repeat bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="flex justify-between items-center mb-4 relative z-10">
        <h2 className="text-xl sm:text-2xl font-medium text-white"> Episodes</h2>
      </div>

      {/* Left Arrow */}
      {!isLeftArrowDisabled && (<button
        onClick={() => scrollPage("left")}
        className={`btn btn-circle absolute -left-3 sm:left-1 md:left-2 top-25 transform -translate-y-1/2 z-20 bg-white text-green-400 shadow-md ${isLeftArrowDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLeftArrowDisabled}
      >
        ❮
      </button>
      )}
      <div className="overflow-hidden mx-auto relative z-10" style={{ width: `${maskWidth}px` }}>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
          onScroll={updateArrowStates}
        >
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="flex-shrink-0 w-[300px] md:w-[350px] h-[96px]"
            >
              <EpisodeCard episode={episode} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scrollPage("right")}
        className={`btn btn-circle absolute -right-2 top-25 md:-right-12 md:top-25 transform -translate-y-1/2 z-20 bg-white text-green-400 shadow-md ${isRightArrowDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isRightArrowDisabled}
      >
        ❯
      </button>


      <LocationCarousel />


    </div>
  );
};

export default EpisodeCarousel;
