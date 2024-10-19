import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import axios from "axios"; // Axios for API requests
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const [cards, setCards] = useState([]); // State to store card data from API
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode enabled by default
  const [feedback, setFeedback] = useState([]); // State to store feedback data
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    // Fetch card data (teachers) from API on component mount
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/teachers/getAllTeachers`
        );
        setCards(response.data.data.teachers); // Accessing teachers array from the response
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to load data.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
      // Fetch feedback for the active teacher
      async function fetchFeedback() {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/feedback/getFeedbacksById/${
              active._id
            }`
          );
          setFeedback(response.data.data.feedback); // Update feedback state with fetched data
        } catch (error) {
          console.error("Error fetching feedback: ", error);
          setFeedback([]); // Reset feedback in case of error
        }
      }
      fetchFeedback();
    } else {
      document.body.style.overflow = "auto";
      setFeedback([]); // Reset feedback when no teacher is active
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (loading) {
    return <div className="text-white">Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div className="text-white">{error}</div>; // Display error message if API fails
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-4 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-700"
          : "bg-gradient-to-r from-blue-500 to-purple-500"
      }`}
    >
      <h1 className="text-3xl font-extrabold text-white mt-8 mb-4">
        Teacher Information
      </h1>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 shadow-md hover:shadow-lg transition"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start border-b pb-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-bold text-black dark:text-neutral-200 text-2xl"
                    >
                      {active.name}
                    </motion.h3>
                    <p className="text-lg text-gray-700 dark:text-neutral-400">
                      Rating:{" "}
                      <Stack spacing={1}>
                        <Rating
                          name={`rating-${active._id}`}
                          value={
                            active.ratings.length > 0
                              ? (
                                  active.ratings.reduce(
                                    (acc, curr) => acc + curr.value,
                                    0
                                  ) / active.ratings.length
                                ).toFixed(1)
                              : 0
                          }
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    </p>
                  </div>
                </div>
                <div className="pt-4 relative">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-black text-lg md:text-xl lg:text-2xl max-h-[400px] overflow-auto pb-10 flex flex-col items-start gap-6 dark:text-neutral-400"
                  >
                    <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg shadow-md">
                      <p className="text-lg font-semibold">
                        Email:{" "}
                        <span className="font-normal">{active.email}</span>
                      </p>
                      <p className="text-lg font-semibold">
                        Academic Background:{" "}
                        <span className="font-normal">
                          {active.academicBackground}
                        </span>
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg shadow-md">
                      <p className="text-lg font-semibold">
                        Research Projects:{" "}
                        <span className="font-normal">
                          {active.researchProjects.length > 0
                            ? active.researchProjects.join(", ")
                            : "No research projects."}
                        </span>
                      </p>
                      <p className="text-lg font-semibold">
                        Patents:{" "}
                        <span className="font-normal">
                          {active.patents.length > 0
                            ? active.patents.join(", ")
                            : "No patents."}
                        </span>
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg shadow-md">
                      <p className="text-lg font-semibold">Feedback:</p>
                      {feedback.length > 0 ? (
                        feedback.map((item, index) => (
                          <div
                            key={index}
                            className="italic text-black dark:text-neutral-300"
                          >
                            "{item}"
                          </div>
                        ))
                      ) : (
                        <div className="italic text-gray-500 dark:text-neutral-500">
                          No feedback.
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="max-w-2xl mx-auto w-full p-6 bg-white rounded-xl shadow-lg mt-8">
        <ul className="w-full gap-4">
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.name}-${id}`}
              key={`card-${card.name}-${id}`}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-blue-100 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-all duration-200 ease-in-out shadow-md"
            >
              <div className="flex gap-4 flex-col md:flex-row w-full">
                <div className="flex-1">
                  <motion.h3
                    layoutId={`title-${card.name}-${id}`}
                    className="font-medium text-black dark:text-neutral-200 text-center md:text-left text-lg md:text-xl"
                  >
                    {index + 1}. {card.name}
                  </motion.h3>
                </div>
                <div className="hidden md:flex md:justify-end">
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    Click for details
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </motion.svg>
  );
};
