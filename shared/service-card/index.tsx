"use client"
import { BASE_URL } from "@/api";
import { useAnimation, motion } from "framer-motion";
import Image from "next/image";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  title: string
  image: string
}

const squareVaraints = {
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  hidden: { opacity: 0, scale: 0 }
};

const ServiceCard: FC<Props> = ({ title, image }) => {
  console.log(image)
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    };
  }, [controls, inView]);

  return (
    <motion.div ref={ref} animate={controls} initial={"hidden"} variants={squareVaraints} className="relative pt-8 pb-6   md:px-8 md:pb-8 md:pt-10 bg-[#F9FAFB] dark:bg-[#161B26] rounded-2xl">
      <div className="flex absolute -top-6 right-0 left-0 justify-center">
        <div className="w-12 h-12 flex justify-center items-center rounded-full bg-[#F4EBFF] dark:bg-purple-500 overflow-hidden">
          <Image
            width={48}
            height={48}
            src={`${BASE_URL}/${image}`}
            alt={title}
            className="object-cover"
          />
        </div>
      </div>
      <h2 className="text-center text-[#101828] dark:text-white text-sm md:text-base lg:text-xl font-semibold">{title}</h2>
    </motion.div>
  )
};

export default ServiceCard;