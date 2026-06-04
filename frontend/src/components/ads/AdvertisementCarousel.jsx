import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAdvertisementsAdmin } from "../../services/advertisementService";

function AdvertisementCarousel() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const data = await getAdvertisementsAdmin();
      setAds(
        Array.isArray(data)
          ? data
          : data.ads || data.advertisements || []
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
    <div className="relative w-full h-[520px] mt-6 flex items-center justify-center overflow-hidden">
      {ads.map((ad, index) => {
        const offset = index - currentIndex;

        // wrap-around for smoothness
        const adjustedOffset =
          offset < -Math.floor(ads.length / 2)
            ? offset + ads.length
            : offset > Math.floor(ads.length / 2)
            ? offset - ads.length
            : offset;

        // only render center + immediate neighbors
        if (Math.abs(adjustedOffset) > 2) return null;

        const scale =
          adjustedOffset === 0 ? 1.05 : Math.abs(adjustedOffset) === 1 ? 0.88 : 0.75;
        const opacity =
          adjustedOffset === 0 ? 1 : Math.abs(adjustedOffset) === 1 ? 0.75 : 0.45;
        const zIndex =
          adjustedOffset === 0 ? 20 : Math.abs(adjustedOffset) === 1 ? 5 : 1;

        return (
          <motion.a
            key={ad._id}
            href={ad.redirectLink}
            target="_blank"
            rel="noreferrer"
            className="absolute top-0 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            animate={{
              x: adjustedOffset * 300, // spacing between cards
              scale,
              opacity,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
            style={{
              zIndex,
              filter: adjustedOffset === 0 ? "blur(0px)" : "blur(0.8px)",
            }}
          >
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-[460px] h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-3xl font-bold">{ad.title}</h3>
              <p className="mt-2 text-base">{ad.description}</p>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}

export default AdvertisementCarousel;
