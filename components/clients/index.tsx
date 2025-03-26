"use client"
import { Subheading } from "@/shared";
import { FC, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import api, { BASE_URL } from "@/api";
import { clearEmpty } from "@/utils";
import { motion } from "framer-motion";

const Clients: FC = () => {
  const t = useTranslations("header");
  const [animate, setAnimate] = useState("hidden");
  
  const { data, isSuccess } = useQuery({
    queryKey: ["clients"],
    queryFn: async (): Promise<{ payload: IClient[] }> => {
      const res = await api.get("/clients", {
        params: clearEmpty({
          page: 1,
          limit: 30,
          order_direction: "asc",
          order_by: "priority",
          is_active: true
        })
      });
      return res.data;
    }
  });
  const clients = useMemo<IClient[]>(() => data ? data.payload : [], [data]);

  useEffect(() => {
    if (isSuccess && clients.length > 0) {
      setAnimate("show");
    }
  }, [isSuccess, clients]);

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.7
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  return clients && (
    <div className="px-4 py-8 flex flex-col gap-y-8">
      <div className="flex items-center justify-center">
        <Subheading text={t("our-clients")} />
      </div>
      <motion.div 
        className="flex flex-wrap justify-center items-center gap-5"
        variants={container}
        initial="hidden"
        animate={animate}
      >
        {clients.map((client, i) => (
          <motion.div key={i} variants={item} className="w-28 sm:w-32 md:w-44">
            <Image
              width={180}
              height={90}
              src={`${BASE_URL}/${client.files[0].path}`}
              alt={`${client.name}-${i}`}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
};

export default Clients;