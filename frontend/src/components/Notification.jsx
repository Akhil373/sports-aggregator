import { AnimatePresence, motion } from "framer-motion";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Notification = ({ source }) => {
  const [fetchedFrom, setFetchedFrom] = useState(null);

  useEffect(() => {
    if (source) {
      setFetchedFrom(
        `News fetched ${
          source === "firebase"
            ? "from Firebase persistent cache"
            : "real-time via API"
        }`,
      );
      const timer = setTimeout(() => {
        setFetchedFrom(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [source]);

  return (
    <AnimatePresence>
      {fetchedFrom && (
        <motion.div
          key="notification"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-notification-theme absolute top-0 right-0 z-10 m-auto flex w-full items-center gap-2 rounded-md p-3 text-gray-800 shadow-md md:m-3 md:w-fit md:p-5"
        >
          <InfoIcon />
          <p className="text-2sm">{fetchedFrom}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
