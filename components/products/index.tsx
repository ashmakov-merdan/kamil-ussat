"use client"
import { Title } from "@/shared";
import ProductCard from "@/shared/product-card";
import { FC, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useSpring, useMotionValue } from "framer-motion";

// Temporary mock data
const mockProducts = [
  {
    id: 1,
    name: "Enterprise CRM System",
    description: "Comprehensive customer relationship management solution with AI-powered insights, advanced analytics, and seamless integration capabilities.",
    files: [{ path: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" }],
    priority: 1
  },
  {
    id: 2,
    name: "Cloud Infrastructure",
    description: "Scalable and secure cloud infrastructure solutions with automated deployment, real-time monitoring, and disaster recovery.",
    files: [{ path: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2424&auto=format&fit=crop" }],
    priority: 2
  },
  {
    id: 3,
    name: "Cybersecurity Suite",
    description: "Advanced threat detection and prevention system with machine learning algorithms and real-time vulnerability assessment.",
    files: [{ path: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2370&auto=format&fit=crop" }],
    priority: 3
  },
  {
    id: 4,
    name: "Data Analytics Platform",
    description: "Powerful data visualization and analytics platform with predictive modeling, custom dashboards, and automated reporting.",
    files: [{ path: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop" }],
    priority: 4
  },
  {
    id: 5,
    name: "DevOps Automation",
    description: "End-to-end DevOps automation solution for continuous integration, deployment, and infrastructure management.",
    files: [{ path: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2374&auto=format&fit=crop" }],
    priority: 5
  },
  {
    id: 6,
    name: "Enterprise IoT Platform",
    description: "Comprehensive IoT management platform with real-time device monitoring, data processing, and automated workflows.",
    files: [{ path: "https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=2439&auto=format&fit=crop" }],
    priority: 6
  }
];

interface MockProduct {
  id: number;
  name: string;
  description: string;
  files: { path: string }[];
  priority: number;
}

const Products: FC = () => {
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

  // Handle scroll
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

  const products = mockProducts;

  return products.length > 0 && (
    <section 
      ref={containerRef}
      id="products" 
      className="relative px-4 2xl:px-0 container mx-auto py-20 md:py-32"
      style={{ perspective: "1000px" }}
    >

      <div className="space-y-16 relative">
        {/* Fixed title section */}
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

        {/* Scrollable products section */}
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
            {products.map((product: MockProduct, index: number) => (
              <ProductCard 
                key={product.id}
                title={product.name}
                image={product.files[0].path}
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