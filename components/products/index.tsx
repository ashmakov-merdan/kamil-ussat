import { Title } from "@/shared";
import ProductCard from "@/shared/product-card";
import { FC } from "react";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";

const Products: FC = () => {
  return (
    <section id={"products"} className="container mx-auto py-24 space-y-16">
      <div className="max-w-3xl space-y-5">
        <Title
          title="Products"
          desc="Our products"
          className="justify-start"
        />
        <p className="text-xl font-normal text-[#94969C]">Get a deposit account, credit card, and spend management software — in one refreshingly easy solution. No fees or minimums.</p>
      </div>
      <div className="flex flex-row flex-nowrap items-center gap-x-12 overflow-x-scroll no-scrollbar">
        <ProductCard
          priority={"01"}
          title="ERDU"
          image={product1}
          desc="Smart and efficient digital management solutions to streamline operations, enhance productivity, and drive business growth."
        />
        <ProductCard
          priority="02"
          image={product2}
          title="Employees Controlling System"
          desc="Monitor, manage, and optimize employee performance with real-time tracking, automation, and seamless workflow integration."
        />
        <ProductCard 
          priority="03"
          title="ERDU"
          image={product1}
          desc="Smart and efficient digital management solutions to streamline operations, enhance productivity, and drive business growth."
        />
      </div>
    </section>
  )
};

export default Products;