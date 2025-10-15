import ArrowIcon from "@/components/icons/arrow-icon";
import Image from "next/image";
import { FC, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  priority: string | number
  title: string
  desc: string
  image: string
}

const ProductCard: FC<Props> = ({ title, desc, image, priority }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 30
  });

  const imageScale = useSpring(1, {
    stiffness: 200,
    damping: 20
  });

  const arrowX = useSpring(0, {
    stiffness: 200,
    damping: 20
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
    
    imageScale.set(1.05);
    arrowX.set(10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    imageScale.set(1);
    arrowX.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="flex-grow-0 flex-shrink-0 w-[500px] space-y-6 select-none translate-z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      initial={{ 
        opacity: 0,
        scale: 0.9,
        rotateX: 10,
        y: 50
      }}
      whileInView={{ 
        opacity: 1,
        scale: 1,
        rotateX: 0,
        y: 0
      }}
      viewport={{ 
        once: true,
        margin: "-100px",
        amount: 0.3
      }}
      transition={{ 
        type: "spring",
        duration: 0.5,
        bounce: 0.05
      }}
    >
      <div 
        className="flex-1 relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-tl from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(50px)",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1), 0 5px 10px -5px rgba(0,0,0,0.04)"
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-black/[0.03] to-transparent dark:from-white/[0.03]"
          style={{ translateZ: "75px" }}
        />
        <motion.div
          className="relative rounded-2xl w-full h-full"
          style={{ scale: imageScale }}
        >
          <Image
            width={1000}
            height={600}
            className="h-full w-full rounded-2xl object-cover bg-transparent"
            src={image}
            alt={title}
            priority
          />
          <motion.div 
            className="absolute inset-0 bg-black/20 dark:bg-black/40"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      <motion.div 
        className="relative flex flex-row items-start px-2"
        style={{ transform: "translateZ(25px)" }}
      >
        <div className="flex-1 flex flex-col">
          <motion.div 
            className="absolute top-0 left-0 z-[-1]"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-[80px] md:text-[96px] font-semibold text-[#D6DCE4] dark:text-[#1F2430] select-none">{priority}</h1>
          </motion.div>
          <div className="pt-[72px] flex-1">
            <motion.h2 
              className="text-[18px] md:text-[32px] font-bold text-[#101828] dark:text-[#FCFCFC]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {title}
            </motion.h2>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-[14px] md:text-[18px] text-[#94969C] font-normal">{desc}</p>
          </motion.div>
        </div>
        <motion.button 
          type="button"
          className="relative group"
          style={{ x: arrowX }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full -z-10 opacity-0 scale-[0.8]"
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
          <ArrowIcon />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;