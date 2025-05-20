import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import LocationCard from "./LocationCard";

const BREAKPOINT_CONFIGS = {
  xs: {
    minScreenWidth: 0,
    cardWidth: 300,
    cardHeight: 96,
    visibleCardsInViewport: 2,
    cardsToScrollBy: 1,
    gap: 12,
  },
  md: {
    minScreenWidth: 768,
    cardWidth: 350,
    cardHeight: 96,
    visibleCardsInViewport: 3.5,
    cardsToScrollBy: 2,
    gap: 16,
  },
};

const getCurrentBreakpointConfig = () => {
  if (typeof window === 'undefined') return BREAKPOINT_CONFIGS.md;
  const screenWidth = window.innerWidth;
  return screenWidth >= BREAKPOINT_CONFIGS.md.minScreenWidth ? BREAKPOINT_CONFIGS.md : BREAKPOINT_CONFIGS.xs;
};

const calculateMaskWidth = (config) => {
  return config.cardWidth * config.visibleCardsInViewport + config.gap * (config.visibleCardsInViewport - 1);
};

const calculateScrollDistance = (config) => {
  return config.cardWidth * config.cardsToScrollBy + config.gap * (config.cardsToScrollBy - 1);
};

const LocationCarousel = () => {
  const [locations, setLocations] = useState([]);
  const scrollRef = useRef(null);

  const [currentConfig, setCurrentConfig] = useState(getCurrentBreakpointConfig());
  const [maskWidth, setMaskWidth] = useState(() => calculateMaskWidth(getCurrentBreakpointConfig()));
  const [scrollAmount, setScrollAmount] = useState(() => calculateScrollDistance(getCurrentBreakpointConfig()));

  const [isLeftArrowDisabled, setIsLeftArrowDisabled] = useState(true);
  const [isRightArrowDisabled, setIsRightArrowDisabled] = useState(true);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/location")
      .then(res => setLocations(res.data.results.slice(0, 10)))
      .catch(console.error);
  }, []);

  const updateArrowStates = useCallback(() => {
    const el = scrollRef.current;
    if (!el || locations.length === 0) {
      setIsLeftArrowDisabled(true);
      setIsRightArrowDisabled(true);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setIsLeftArrowDisabled(scrollLeft <= 1);
    setIsRightArrowDisabled(scrollLeft >= scrollWidth - clientWidth - 1);
  }, [locations.length]);

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
  }, [locations, maskWidth, updateArrowStates]);

  const scrollPage = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const { cardWidth, cardHeight, gap } = currentConfig;

  return (
    <div className="relative my-10 px-2 sm:px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h2 className="text-xl sm:text-2xl font-medium text-white">Locations</h2>
      </div>

      {/* Left Arrow */}
      {!isLeftArrowDisabled && (
        <button
          onClick={() => scrollPage("left")}
          className="btn btn-circle absolute -left-3 sm:left-1 md:left-2 top-25 transform -translate-y-1/2 z-20 bg-white text-green-400 shadow-md"
        >
          ❮
        </button>
      )}

      {/* Scroll Mask */}
      <div className="overflow-hidden mx-auto relative z-10" style={{ width: `${maskWidth}px` }}>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
          onScroll={updateArrowStates}
        >
          {locations.map((location) => (
            <div
              key={location.id}
              className="flex-shrink-0"
              style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
            >
              <LocationCard location={location} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      {!isRightArrowDisabled && (
        <button
          onClick={() => scrollPage("right")}
          className="btn btn-circle absolute -right-2 top-25 md:-right-16 md:top-25 transform -translate-y-1/2 z-20 bg-white text-green-400 shadow-md"
        >
          ❯
        </button>
      )}
    </div>
  );
};

export default LocationCarousel;
