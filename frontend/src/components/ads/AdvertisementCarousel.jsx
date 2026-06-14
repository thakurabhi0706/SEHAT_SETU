import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getActiveAdvertisements } from "../../services/advertisementService";

function AdvertisementCarousel() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const data = await getActiveAdvertisements();
      setAds(
        Array.isArray(data) ? data : data.ads || data.advertisements || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!ads.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads]);

  if (!ads.length) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Cards Container */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-5"
          animate={{
            x: `-${currentIndex * (100 / 3)}%`,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          {ads.map((ad) => (
            <a
              key={ad._id}
              href={ad.redirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[calc(33.333%-14px)] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group flex flex-col h-80"
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {ad.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                    {ad.description}
                  </p>
                </div>

                <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#7A341F] to-orange-500 text-white font-semibold text-sm hover:shadow-md transition-all duration-300 w-fit group-hover:scale-105">
                  Learn More
                </button>
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {ads.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-gradient-to-r from-[#7A341F] to-orange-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-gradient-to-r from-[#7A341F] to-orange-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      <div className="relative z-30 flex items-center gap-2 mt-4 justify-center">
        {ads.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-8 h-2 bg-gradient-to-r from-[#7A341F] to-orange-500 shadow-md"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default AdvertisementCarousel;

