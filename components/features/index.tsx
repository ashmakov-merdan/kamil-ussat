"use client"
import api from "@/api";
import { FeatureCard, Title } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { FC, useMemo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Features: FC = () => {
  const locale = useLocale();
  const t = useTranslations();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const { data, isSuccess } = useQuery({
    queryKey: ["features", locale],
    queryFn: async (): Promise<{ payload: IFeature[] }> => {
      const res = await api.get('/services', { params: {
        lang: locale,
        order_direction: "desc",
        order_by: "priority",
        limit: 30,
        page: 1
      }});
      return res.data
    }
  });

  const features = useMemo<IFeature[]>(() => data ? data.payload : [], [data]);

  useEffect(() => {
    if (inView && isSuccess && features.length > 0) {
      controls.start("show");
    }
  }, [inView, isSuccess, features, controls]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -20
    },
    show: { 
      opacity: 1,
      y: 0
    }
  };

  return features?.length > 0 ? (
    <section id={'features'} className="px-4 xl:px-0 container mx-auto py-10 md:py-24 flex flex-col gap-y-16">
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={titleVariants}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
        className="flex flex-col gap-y-3 md:gap-y-5"
      >
        <Title
          title={t("section.features")}
          desc={t("features.heading")}
        />
        <motion.div 
          className="lg:max-w-3xl w-full mx-auto lg:px-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <p className="text-base sm:text-[18px] md:text-xl font-normal text-[#94969C] text-center">{t("features.subheading")}</p>
        </motion.div>
      </motion.div>
      <motion.div 
        ref={ref}
        className="grid grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        {features.map((feature) => (
          <motion.div 
            key={feature.id} 
            variants={item}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              mass: 1
            }}
          >
            <FeatureCard 
              title={feature.name as string}
              desc={feature.description as string}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  ) : null
};

export default Features;