// AdvertisementCarousel.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <div className="relative w-full py-12 mt-8 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-rose-400/25 via-orange-300/15 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-300/10 to-transparent blur-[100px]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-red-500/10 to-transparent blur-[100px]"
        />
      </div>

      {/* Cards Container */}
      <div className="relative w-full h-[520px] flex items-center justify-center">
        {ads.map((ad, index) => {
          const offset = index - currentIndex;
          const adjustedOffset =
            offset < -Math.floor(ads.length / 2)
              ? offset + ads.length
              : offset > Math.floor(ads.length / 2)
              ? offset - ads.length
              : offset;

          if (Math.abs(adjustedOffset) > 2) return null;

          const isCenter = adjustedOffset === 0;
          const isNeighbor = Math.abs(adjustedOffset) === 1;

          const scale = isCenter ? 1.08 : isNeighbor ? 0.85 : 0.7;
          const opacity = isCenter ? 1 : isNeighbor ? 0.65 : 0.35;
          const zIndex = isCenter ? 20 : isNeighbor ? 10 : 5;
          const blur = isCenter ? 0 : isNeighbor ? 0.5 : 2;

          return (
            <motion.a
              key={ad._id}
              href={ad.redirectLink}
              target="_blank"
              rel="noreferrer"
              className="absolute top-0 rounded-3xl overflow-hidden cursor-pointer group"
              animate={{
                x: adjustedOffset * 320,
                scale,
                opacity,
                rotateY: adjustedOffset === 0 ? 0 : adjustedOffset * 8,
                z: zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 30,
                mass: 1.3,
                restDelta: 0.0001,
              }}
              style={{
                zIndex,
                filter: `blur(${blur}px)`,
                boxShadow: isCenter
                  ? "0 0 0 1px rgba(255,255,255,0.2), 0 40px 100px -15px rgba(0,0,0,0.6), 0 0 50px rgba(220,80,60,0.3)"
                  : isNeighbor
                  ? "0 20px 60px rgba(0,0,0,0.4)"
                  : "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              {/* Image */}
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-[460px] h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Multi-stop gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-50% to-black/10" />

              {/* Top vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent opacity-50" />

              {/* Glassy accent bar at bottom */}
              {isCenter && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 via-orange-400 to-red-500 origin-left shadow-lg shadow-rose-400/50"
                />
              )}

              {/* Featured badge */}
              {isCenter && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                  className="absolute top-5 left-5 flex items-center gap-2 bg-white/12 backdrop-blur-xl border border-white/25 rounded-full px-4 py-2 shadow-xl"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-rose-400 to-orange-400 shadow-lg shadow-rose-400/60"
                  />
                  <span className="text-xs font-bold text-white tracking-wide uppercase">
                    Featured
                  </span>
                </motion.div>
              )}

              {/* Text content */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-7 text-white"
                animate={{ y: isCenter ? 0 : 8, opacity: isCenter ? 1 : 0.75 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.h3
                  initial={false}
                  animate={{ letterSpacing: isCenter ? "0px" : "0.5px" }}
                  className="text-3xl font-black drop-shadow-xl leading-tight tracking-tight"
                >
                  {ad.title}
                </motion.h3>

                <motion.p
                  initial={false}
                  animate={{ opacity: isCenter ? 1 : 0.85 }}
                  className="mt-2.5 text-sm text-gray-200 drop-shadow-md leading-relaxed line-clamp-2"
                >
                  {ad.description}
                </motion.p>

                {/* CTA button */}
                {isCenter && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                    className="group/btn mt-5 px-5 py-2 rounded-full bg-gradient-to-r from-rose-500/90 to-orange-500/90 backdrop-blur-sm border border-white/30 text-xs font-bold text-white tracking-wide hover:from-rose-500 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-rose-500/40 hover:shadow-rose-500/60"
                  >
                    <span className="flex items-center gap-1.5">
                      Learn More
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                )}
              </motion.div>
            </motion.a>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {ads.length > 1 && (
        <>
          <motion.button
            onClick={goToPrevious}
            whileHover={{ scale: 1.15, x: -4 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white hover:shadow-xl hover:shadow-rose-500/50 transition-all duration-300 group backdrop-blur-sm border border-white/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.15, x: 4 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white hover:shadow-xl hover:shadow-rose-500/50 transition-all duration-300 group backdrop-blur-sm border border-white/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </>
      )}

      {/* Dot indicators */}
      <div className="relative z-30 flex items-center gap-2.5 mt-8">
        {ads.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentIndex(i)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "w-9 h-3 bg-gradient-to-r from-rose-500 to-orange-500 shadow-lg shadow-rose-500/60"
                : "w-3 h-3 bg-white/30 hover:bg-white/60 border border-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default AdvertisementCarousel;