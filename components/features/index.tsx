"use client"
import api from "@/api";
import { FeatureCard, Title } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { FC, useMemo } from "react";

const Features: FC = () => {
  const { data } = useQuery({
    queryKey: ["features"],
    queryFn: async (): Promise<{ payload: IFeature[] }> => {
      const res = await api.get('/services', { params: {
        lang: "tk",
        order_direction: "desc",
        order_by: "priority",
        limit: 30,
        page: 1
      }});
      return res.data
    }
  });

  const features = useMemo<IFeature[]>(() => data ? data.payload : [], [data]);

  return features.length ? (
    <section id={'features'} className="px-4 xl:px-0 container mx-auto py-10 md:py-24 flex flex-col gap-y-16">
      <div className="flex flex-col gap-y-3 md:gap-y-5">
        <Title
          title="Features"
          desc="Comprehensive IT & Development Solutions"
        />
        <div className="lg:max-w-3xl w-full mx-auto lg:px-12">
          <p className="text-base sm:text-[18px] md:text-xl font-normal text-[#94969C] text-center">Providing scalable, secure, and high-performance solutions for software, networking, and security needs.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <FeatureCard 
            key={feature.id}
            title={feature.name as string}
            desc={feature.description as string}
          />
        ))}
      </div>
    </section>
  ) : null
};

export default Features;