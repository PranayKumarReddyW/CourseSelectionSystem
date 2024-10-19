import { LoginForm } from "../components/LoginPage";
import { cn } from "../lib/utils";
import React from "react";
import { motion } from "framer-motion";

const SignUp = () => {
  const BackgroundGradient = ({
    children,
    className,
    containerClassName,
    animate = true,
  }) => {
    const variants = {
      initial: {
        backgroundPosition: "0 50%",
      },
      animate: {
        backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
      },
    };
    return (
      <div className={cn("relative p-4 group", containerClassName)}>
        <motion.div
          variants={animate ? variants : undefined}
          initial={animate ? "initial" : undefined}
          animate={animate ? "animate" : undefined}
          transition={
            animate
              ? {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }
              : undefined
          }
          style={{
            backgroundSize: animate ? "400% 400%" : undefined,
            filter: "blur(10px)", // Adjust blur as needed
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            borderRadius: "1rem", // Adjust border radius as needed
          }}
          className={cn(
            "opacity-60 group-hover:opacity-100 transition duration-500 will-change-transform",
            "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
          )}
        />
        <div className={cn("relative z-10", className)}>{children}</div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 flex justify-center items-center h-screen">
      <BackgroundGradient>
        <LoginForm />
      </BackgroundGradient>
    </div>
  );
};

export default SignUp;
