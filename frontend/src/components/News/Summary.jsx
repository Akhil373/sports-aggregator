import axios from "axios";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

const Summary = ({ data, category }) => {
  const [response, setResponse] = useState("");
  const [loadingSummmary, setLoadingSummary] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const getSummary = async () => {
    try {
      setLoadingSummary(true);
      setResponse("");
      setIsSummaryVisible(true);

      const payload = {
        articles: data,
        category,
      };

      const { data: result } = await axios.post(
        "http://localhost:5000/api/summary",
        payload,
      );

      if (!result.summary) {
        setResponse("Error summarizing articles. Please try again.");
        return;
      }

      setResponse(result.summary);
    } catch (error) {
      console.error("Error summarizing articles:", error);
      setResponse("Error summarizing articles. Please try again.");
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    if (response) {
      requestAnimationFrame(() => {
        window.scrollBy({
          top: 200,
          behavior: "smooth",
        });
      });
    } else {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }, [response]);

  const closeSummary = () => {
    setIsSummaryVisible(false);
    setResponse("");
  };

  if (loadingSummmary) {
    return (
      <div className="bg-summary-btn mb-3 flex items-center rounded-2xl text-white transition-all">
        <p className="p-5">Generating Summary...</p>
        <Sparkle className="animate-spin fill-[#F9E400] text-[#F9E400]"></Sparkle>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col ${isSummaryVisible ? "gap-5 border-t-2 lg:pb-20 dark:border-0" : "pb-5"}`}
    >
      {isSummaryVisible && response && (
        <motion.div
          initial={{ opacity: 0, height: 0, overflow: "hidden" }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-hidden"
        >
          <Markdown className="mt-5 flex flex-col items-start gap-5 rounded-2xl p-5 leading-7 text-black dark:bg-black dark:text-white dark:shadow-none">
            {response}
          </Markdown>
        </motion.div>
      )}

      <div className="bottom-0 left-0 right-0 px-5 md:px-0 lg:absolute">
        <div className={isSummaryVisible ? "" : "flex justify-end"}>
          <button
            onClick={isSummaryVisible ? closeSummary : getSummary}
            className={`bg-summary-btn text-3xs mb-5 flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-center font-[500] tracking-wide text-white ${
              isSummaryVisible ? "w-full" : "w-full lg:w-auto"
            }`}
          >
            {isSummaryVisible ? (
              "Close Summary"
            ) : (
              <>
                Summarize Articles{" "}
                <Sparkle className="animate-wiggle-inf fill-[#F9E400] text-center text-[#F9E400]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
