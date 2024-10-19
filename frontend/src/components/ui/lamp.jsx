import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function HeroSection() {
  const navigate = useNavigate(); // Initialize navigate

  const handleNavigateToCourses = () => {
    navigate("/courses"); // Navigate to the courses page
  };

  return (
    <HeroContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-purple-300 to-purple-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Simplify Your Academic Experience <br /> with Our System
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-4 text-lg text-center text-gray-200 md:text-xl"
      >
        Effortlessly select your courses and connect with the best teachers
        tailored to your learning style.
      </motion.p>
      <div className="flex justify-center mt-6">
        <motion.button
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleNavigateToCourses} // Handle click event
          className="ml-4 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg shadow-md hover:bg-white hover:text-purple-600 transition duration-200"
        >
          View Courses
        </motion.button>
      </div>
    </HeroContainer>
  );
}

export const HeroContainer = ({ children }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-900 w-full rounded-md z-0 pb-10" // Added padding-bottom here
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] bg-gradient-to-r from-purple-600 to-transparent text-white"
        >
          <div className="absolute w-[100%] left-0 bg-gray-900 h-40 bottom-0 z-20" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-to-r from-transparent to-purple-600 text-white"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-gray-900 bottom-0 z-20" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-gray-900 blur-2xl"></div>
      </div>
      <div className="relative z-50 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
