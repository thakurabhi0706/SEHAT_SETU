import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    }, 4000);
    return () => clearInterval(interval);
  }, [ads]);

  return (
    <div className="relative w-full py-10 mt-6 flex flex-col items-center justify-center overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-rose-400/20 blur-[100px]" />
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-orange-300/10 blur-[80px]" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-red-500/10 blur-[80px]" />
      </div>

      {/* Cards */}
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

          const scale = isCenter ? 1.06 : isNeighbor ? 0.88 : 0.74;
          const opacity = isCenter ? 1 : isNeighbor ? 0.72 : 0.4;
          const zIndex = isCenter ? 20 : isNeighbor ? 5 : 1;

          return (
            <motion.a
              key={ad._id}
              href={ad.redirectLink}
              target="_blank"
              rel="noreferrer"
              className="absolute top-0 rounded-3xl overflow-hidden cursor-pointer group"
              animate={{
                x: adjustedOffset * 310,
                scale,
                opacity,
                rotateY: adjustedOffset === 0 ? 0 : adjustedOffset * 12,
              }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 28,
                mass: 0.9,
              }}
              style={{
                zIndex,
                filter: isCenter ? "blur(0px)" : "blur(1.5px)",
                boxShadow: isCenter
                  ? "0 0 0 1px rgba(255,255,255,0.15), 0 30px 80px -10px rgba(0,0,0,0.5), 0 0 40px rgba(220,80,60,0.25)"
                  : "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Image */}
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-[460px] h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Multi-stop gradient overlay — richer depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 via-40% to-transparent" />

              {/* Subtle top vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent opacity-60" />

              {/* Glassy accent bar at bottom */}
              {isCenter && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-orange-400 to-red-500 origin-left"
                />
              )}

              {/* "LIVE" / badge pill — shown only on center card */}
              {isCenter && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">
                    Featured
                  </span>
                </motion.div>
              )}

              {/* Text content */}
              <motion.div
                className="absolute bottom-0 p-6 text-white"
                animate={{ y: isCenter ? 0 : 6, opacity: isCenter ? 1 : 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl font-extrabold drop-shadow-lg leading-tight tracking-tight">
                  {ad.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300 drop-shadow-md leading-relaxed line-clamp-2">
                  {ad.description}
                </p>

                {/* CTA chip — only center card */}
                {isCenter && (
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="inline-block mt-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-xs font-semibold text-white tracking-wide hover:bg-white/25 transition-colors"
                  >
                    Learn More →
                  </motion.span>
                )}
              </motion.div>
            </motion.a>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="relative z-30 flex items-center gap-2 mt-6">
        {ads.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              i === currentIndex
                ? "w-8 h-2.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]"
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default AdvertisementCarousel;
