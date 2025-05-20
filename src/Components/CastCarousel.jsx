import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CharacterCard from "./CharacterCard"; // Make sure path is correct
import axios from "axios";


const GAP = 16;

const BREAKPOINT_CONFIGS = {
  xs: {

    minScreenWidth: 0,
    cardWidth: 200, // From CharacterCard: w-[200px]
    cardHeight: 230, // From CharacterCard: h-[230px]
    visibleCardsInViewport: 1.5, // Show 1.5 cards
    cardsToScrollBy: 1, // Scroll by 1 card
  },
  sm: {
    // Small screens (Tailwind sm: 640px and up)
    minScreenWidth: 640,
    cardWidth: 240, // From CharacterCard: sm:w-[240px]
    cardHeight: 270, // From CharacterCard: sm:h-[270px]
    visibleCardsInViewport: 2.5, // Show 2.5 cards
    cardsToScrollBy: 2, // Scroll by 2 cards
  },
  md: {
    // Medium screens / Original large screen (Tailwind md: 768px and up)
    minScreenWidth: 768,
    cardWidth: 290, // From CharacterCard: md:w-[290px]
    cardHeight: 320, // From CharacterCard: md:h-[320px]
    visibleCardsInViewport: 5.5, // Original: 5.5 cards
    cardsToScrollBy: 2, // Scroll by 2 cards as requested
  },
};

// Helper function to get the current configuration based on window width
const getCurrentBreakpointConfig = () => {
  if (typeof window === 'undefined') {
    return BREAKPOINT_CONFIGS.md; // Default for SSR or non-browser environments
  }
  const screenWidth = window.innerWidth;
  if (screenWidth >= BREAKPOINT_CONFIGS.md.minScreenWidth) {
    return BREAKPOINT_CONFIGS.md;
  }
  if (screenWidth >= BREAKPOINT_CONFIGS.sm.minScreenWidth) {
    return BREAKPOINT_CONFIGS.sm;
  }
  return BREAKPOINT_CONFIGS.xs;
};

// Helper function to calculate the width of the carousel mask (viewport)
const calculateMaskWidth = (config) => {
  // Formula based on original logic: Card widths + (N-1) gaps
  return config.cardWidth * config.visibleCardsInViewport + GAP * (config.visibleCardsInViewport > 1 ? config.visibleCardsInViewport - 1 : 0);
};

// Helper function to calculate how far to scroll
const calculateScrollDistance = (config) => {
  // Scroll by N cards + (N-1) gaps between them
  return config.cardWidth * config.cardsToScrollBy + GAP * Math.max(0, config.cardsToScrollBy - 1);
};


const CastCarousel = () => {
  const [characters, setCharacters] = useState([]);
  const scrollRef = useRef(null);

  // State for dynamic carousel properties
  const [currentConfig, setCurrentConfig] = useState(getCurrentBreakpointConfig());
  const [maskWidth, setMaskWidth] = useState(() => calculateMaskWidth(getCurrentBreakpointConfig()));
  const [scrollAmount, setScrollAmount] = useState(() => calculateScrollDistance(getCurrentBreakpointConfig()));

  // State for arrow button disabled status
  const [isLeftArrowDisabled, setIsLeftArrowDisabled] = useState(true);
  const [isRightArrowDisabled, setIsRightArrowDisabled] = useState(true);

  // Fetch characters
  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(res => {
        setCharacters(res.data.results.slice(0, 10)); // Get 10 characters
      })
      .catch(console.error);
  }, []);

  // Update arrow disabled states
  const updateArrowStates = useCallback(() => {
    if (!scrollRef.current || characters.length === 0) {
      setIsLeftArrowDisabled(true);
      setIsRightArrowDisabled(true);
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    // Add a small tolerance (e.g., 1px) for floating point comparisons
    setIsLeftArrowDisabled(scrollLeft <= 1);
    setIsRightArrowDisabled(scrollLeft >= scrollWidth - clientWidth - 1);
  }, [characters.length]);


  // Handle window resize to update carousel dimensions
  useEffect(() => {
    const handleResize = () => {
      const newConfig = getCurrentBreakpointConfig();
      setCurrentConfig(newConfig);
      setMaskWidth(calculateMaskWidth(newConfig));
      setScrollAmount(calculateScrollDistance(newConfig));
      // updateArrowStates might be needed here if clientWidth changes significantly
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set dimensions

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array, runs once on mount and cleans up

  // Update arrows when characters load or config changes
  useEffect(() => {
    updateArrowStates();
    // Add a slight delay if scrollWidth isn't immediately available after characters load
    const timer = setTimeout(updateArrowStates, 100);
    return () => clearTimeout(timer);
  }, [characters, maskWidth, updateArrowStates]);


  // Scroll function
  const scrollPage = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    // Arrows will be updated by the onScroll event, but can also be updated here after a delay
    // to catch the state after the smooth scroll finishes.
    // setTimeout(updateArrowStates, 500); // Adjust delay as needed for smooth scroll duration
  };

  return (
    <div className="my-8 sm:my-10 px-2 sm:px-4 relative"> {/* Adjusted padding for xs screens */}
      {/* Heading + "View All" */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-medium text-white">Meet The Cast</h2>
        <Link to="/cast">
          <button className="btn btn-outline md:p-7 sm:btn-sm text-white md:text-xl font-medium border-lime-400 hover:bg-lime-400 hover:text-black">
            View All
          </button>
        </Link>
      </div>

      {/* Left arrow */}
      <button
        onClick={() => scrollPage("left")}
        className={`btn btn-circle absolute left-0 sm:left-1 md:left-2 top-1/2 transform -translate-y-1/2 z-10 bg-lime-300 hover:bg-lime-400 text-black shadow-md ${isLeftArrowDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLeftArrowDisabled}
        aria-label="Scroll left"
      >
        ❮
      </button>

      {/* Mask: fixes viewport width */}
      <div
        className="overflow-hidden mx-auto"
        style={{ width: `${maskWidth}px` }}
      >
        {/* Inner scrollable row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth no-scrollbar"
          style={{ gap: `${GAP}px` }} // Set gap using style for consistency
          onScroll={updateArrowStates} // Update arrows on scroll
        >
          {characters.map((character) => (
            // This div wrapper ensures each card takes up the correct space for its breakpoint
            // The classes here MUST match the responsive outer dimensions of CharacterCard
            <div
              key={character.id}
              className="flex-shrink-0 w-[200px] h-[230px] sm:w-[240px] sm:h-[270px] md:w-[290px] md:h-[320px]"
            >
              <CharacterCard character={character} />
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scrollPage("right")}
        className={`btn btn-circle absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-lime-300 hover:bg-lime-400 text-black shadow-md ${isRightArrowDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isRightArrowDisabled}
        aria-label="Scroll right"
      >
        ❯
      </button>
    </div>
  );
};

export default CastCarousel;