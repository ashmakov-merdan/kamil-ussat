"use client"
import { Title } from "@/shared";
import ProductCard from "@/shared/product-card";
import { FC, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api, { BASE_URL } from "@/api";
import { useLocale } from "next-intl";

const Products: FC = () => {
  const locale = useLocale();

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
      return res.data
    }
  });
  const products = useMemo<IProduct[]>(() => data ? data.payload : [], [data]);

  return (
    <section id={"products"} className="px-4 2xl:px-0 container mx-auto py-10 md:py-24 space-y-16">
      <div className="max-w-3xl space-y-5">
        <Title
          title="Products"
          desc="Our products"
          isHeadingCentered={false}
          className="justify-start"
        />
        <p className="text-[18px] md:text-xl font-normal text-[#94969C]">Get a deposit account, credit card, and spend management software — in one refreshingly easy solution. No fees or minimums.</p>
      </div>
      <div className="flex flex-row flex-nowrap items-start gap-x-12 overflow-x-scroll no-scrollbar">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id}
            title={product.name}
            image={`${BASE_URL}/${product.files[0].path}`}
            desc={product.description}
            priority={String(index + 1).padStart(2, '0')}
          />
        ))}
      </div>
    </section>
  )
};

export default Products;