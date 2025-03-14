import { AnimatePresence, motion } from "framer-motion";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Notification = ({ source }) => {
  const [fetchedFrom, setFetchedFrom] = useState(null);
  const notificationDuration = 2000;

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
      }, notificationDuration);
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
          className="bg-notification-theme absolute right-0 top-0 z-10 m-auto flex w-full flex-col items-center rounded-md text-gray-800 shadow-md md:m-3 md:w-fit"
        >
          <div className="flex w-full items-center gap-2 p-3 md:p-5">
            <InfoIcon />
            <p className="text-2sm">{fetchedFrom}</p>
          </div>

          <motion.div
            className="h-1 self-start rounded-b-md bg-green-700"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{
              duration: notificationDuration / 1000,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
