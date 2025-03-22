"use client"
import { FC } from "react";
import Boxes from "./boxes";
import Clients from "../clients";
import { Shadow } from "@/shared";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Header: FC = () => {
  const t = useTranslations("header");

  return (
    <header className="mt-16 lg:mt-20 relative 2xl:container h-[90vh] xl:h-screen 2xl:mx-auto">
      <Shadow />
      <div className="max-lg:px-4 relative container mx-auto w-screen h-[60vh] sm:h-[65vh] border-y border-neutral-100 dark:border-neutral-100/10 overflow-hidden">
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-12 z-[4]">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <div className="py-1 pl-1 pr-1 sm:pr-2.5 flex flex-row items-center border border-[#D0D5DD] dark:border-[#333741] rounded-md gap-x-1 sm:gap-x-3">
              <div className="px-1 sm:px-2 py-0.5 border rounded-md border-[#D0D5DD] dark:border-[#333741]">
                <span className="text-xs sm:text-sm text-[#344054] dark:text-white transition-colors">{t("new-products")}</span>
              </div>
              <div>
                <a href={"#products"} className="text-xs sm:text-sm hover:underline text-[#344054] dark:text-white transition-colors">{t("check-out")}</a>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 300 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: "easeInOut" }} className="gap-y-6">
              <h1
                className="text-3xl sm:text-5xl lg:text-[60px] text-center text-[#101828] dark:text-white font-semibold transition-colors">We build what we believe</h1>
              <p className="max-w-3xl w-full text-center text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#475467] dark:text-[#94969C] transition-colors">We are team of software  engineers and web developers. We offer our services to a local and international companies. </p>
            </motion.div>
          </div>
        </div>
        <Boxes />
      </div>
      <Clients />
    </header>
  )
};

export default Header;