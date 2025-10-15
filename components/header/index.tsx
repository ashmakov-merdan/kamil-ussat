"use client"
import { FC, useEffect } from "react";
import Boxes from "./boxes";
import Clients from "../clients";
import { Shadow } from "@/shared";
import { motion, useAnimation } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/utils";
import { useInView } from "react-intersection-observer";

const Header: FC = () => {
  const t = useTranslations("header");
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <header className={cn(
      "mt-16 lg:mt-20 relative 2xl:container h-fit xl:h-screen 2xl:mx-auto"
    )}>
      <Shadow />
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        className="max-lg:px-4 relative container mx-auto w-screen h-[60vh] sm:h-[65vh] border-y border-neutral-100 dark:border-neutral-100/10 overflow-hidden"
      >
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-12 z-[4]">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
              className="py-1 pl-1 pr-1 sm:pr-2.5 flex flex-row items-center border border-[#D0D5DD] dark:border-[#333741] rounded-md gap-x-1 sm:gap-x-3"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                className="px-1 sm:px-2 py-0.5 border rounded-md border-[#D0D5DD] dark:border-[#333741]"
              >
                <span className="text-xs sm:text-sm text-[#344054] dark:text-white transition-colors">{t("new-products")}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <a href={"#products"} className="text-xs sm:text-sm hover:underline text-[#344054] dark:text-white transition-colors">{t("check-out")}</a>
              </motion.div>
            </motion.div>
            <motion.div 
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-y-6 relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 0.2, 0.1],
                  scale: [0.8, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 blur-3xl rounded-full"
              />
              <motion.div
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <motion.h1
                  key={t("title")}
                  className="text-3xl sm:text-4xl lg:text-2xl text-center text-[#101828] dark:text-white font-semibold transition-colors relative z-10 overflow-hidden"
                >
                  {t("title").split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ 
                        opacity: 0,
                        y: 20,
                        rotateX: -60
                      }}
                      animate={{ 
                        opacity: 1,
                        y: 0,
                        rotateX: 0
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.2, 0.65, 0.3, 0.9],
                        delay: index * 0.03
                      }}
                      className="inline-block"
                      style={{
                        transformOrigin: "50% 50% -20px",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                className="relative overflow-hidden"
              >
                <motion.p
                  initial={{ 
                    opacity: 0,
                    filter: "blur(10px)",
                    y: 20
                  }}
                  animate={{ 
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.5,
                  }}
                  className="max-w-3xl w-full text-center text-sm sm:text-base font-normal text-[#475467] dark:text-[#94969C] transition-colors relative z-10"
                >
                  {t("subheading")}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <Boxes />
      </motion.div>
      <Clients />
    </header>
  );
};

export default Header;