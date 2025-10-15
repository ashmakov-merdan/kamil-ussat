"use client"
import { Title } from "@/shared";
import ProductCard from "@/shared/product-card";
import { FC, useRef, useEffect, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api, { BASE_URL } from "@/api";

interface IProduct {
  id: number;
  name: string;
  description: string;
  files: { path: string }[];
}

const Products: FC = () => {
  const locale = useLocale();
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollProgress = useMotionValue(0);
  const scrollX = useMotionValue(0);
  
  const smoothScrollX = useSpring(scrollX, {
    damping: 60,
    mass: 1.2,
    stiffness: 200
  });

  useEffect(() => {
    if (!scrollRef.current) return;

    const element = scrollRef.current;
    let rafId: number;
    const handleScroll = () => {
      if (!element) return;
      
      const scrollLeft = element.scrollLeft;
      const maxScroll = element.scrollWidth;
      
      const progress = Math.max(0, Math.min(1, scrollLeft / maxScroll));
      scrollProgress.set(progress);
      
      scrollX.set(-scrollLeft);

      rafId = requestAnimationFrame(handleScroll);
    };

    handleScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollProgress, scrollX]);

  const { data } = useQuery({
    queryKey: ["products", locale],
    queryFn: async (): Promise<{ payload: IProduct[] }> => {
      const res = await api.get("/products", { params: {
        limit: 50,
        page: 1,
        order_direction: "asc",
        order_by: "priority",
        lang: locale
      }});
      return res.data;
    }
  });

  const products = useMemo<IProduct[]>(() => data ? data.payload : [], [data]);

  return products.length > 0 && (
    <section 
      ref={containerRef}
      id="products" 
      className="relative px-4 2xl:px-0 container mx-auto py-20 md:py-32"
      style={{ perspective: "1000px" }}
    >

      <div className="space-y-16 relative">
        <motion.div 
          className="max-w-3xl space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Title
            title={t("section.products")}
            desc={t("products.heading")}
            isHeadingCentered={false}
            className="justify-start"
          />
          <motion.p 
            className="text-[18px] md:text-xl font-normal text-[#94969C]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t("products.subheading")}
          </motion.p>
        </motion.div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div 
            className="relative"
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
          >
            <div 
              ref={scrollRef}
              className="overflow-x-scroll no-scrollbar px-4 w-full"
            >
              <motion.div
                className="inline-flex flex-row flex-nowrap items-start gap-x-12 py-10 pr-4"
                style={{ 
                  x: smoothScrollX,
                  width: '100%'
                }}
              >
            {products.map((product: IProduct, index: number) => (
              <ProductCard 
                key={product.id}
                title={product.name}
                image={`${BASE_URL}/${product.files[0].path}`}
                desc={product.description}
                priority={String(index + 1).padStart(2, '0')}
              />
            ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
};

export default Products;