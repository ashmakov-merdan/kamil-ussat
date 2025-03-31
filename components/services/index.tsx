"use client"
import { ServiceCard, Title } from "@/shared";
import { FC, ReactNode, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { clearEmpty } from "@/utils";
import { useLocale, useTranslations } from "next-intl";

const Services: FC = () => {
  const locale = useLocale();
  const t = useTranslations();
  const { data } = useQuery({
    queryKey: ["services", locale],
    queryFn: async (): Promise<{ payload: IFeature[] }> => {
      const res = await api.get("/features", {
        params: clearEmpty({
          limit: 50,
          page: 1,
          is_active: true,
          order_direction: "asc",
          order_by: "priority",
          lang: locale
        })
      });

      return res.data;
    }
  });
  const services = useMemo<IFeature[]>(() => data ? data.payload : [], [data]);

  return services.length > 0 && (
    <section id={"services"} className="px-4 2xl:px-0 container mx-auto pt-16 lg:pt-24 pb-32 lg:pb-40">
      <div>
        <Title
          title={t("section.services")}
          desc={t("services.heading")}
        />
      </div>
      <div className="pt-12 grid gap-x-6 gap-y-6 lg:gap-y-10">
        {services.reduce((acc: ReactNode[], _, index) => {
          if (index % 5 === 0) {
            acc.push(
              <div key={`group-${index}`} className="hidden lg:grid lg:grid-cols-3 gap-6">
                {services.slice(index, index + 3).map((service, i) => (
                  <ServiceCard
                    key={`service-${index + i}`}
                    title={service.name}
                    image={service.files[0].path}
                  />
                ))}
              </div>
            );
          }
          if (index % 5 === 3) {
            acc.push(
              <div key={`group-${index}-second`} className="hidden lg:grid lg:grid-cols-2 gap-6">
                {services.slice(index, index + 2).map((service, i) => (
                  <ServiceCard
                    key={`service-${index + i}`}
                    title={service.name}
                    image={service.files[0].path}
                  />
                ))}
              </div>
            );
          }
          return acc;
        }, [])}

        {services.length > 0 && (
          <>
            <div className="lg:hidden">
              <ServiceCard 
                image={services[0].files[0].path} 
                title={services[0].name} 
              />
            </div>
            
            {Array.from({ length: Math.floor((services.length - 2) / 2) }).map((_, pairIndex) => {
              const startIdx = 1 + (pairIndex * 2);
              return (
                <div key={`pair-${pairIndex}`} className="lg:hidden grid grid-cols-2 gap-6">
                  <ServiceCard 
                    image={services[startIdx].files[0].path} 
                    title={services[startIdx].name} 
                  />
                  {startIdx + 1 < services.length - 1 && (
                    <ServiceCard 
                      image={services[startIdx + 1].files[0].path} 
                      title={services[startIdx + 1].name} 
                    />
                  )}
                </div>
              );
            })}
            
            {services.length > 1 && (
              <div className="lg:hidden">
                <ServiceCard 
                  image={services[services.length - 1].files[0].path} 
                  title={services[services.length - 1].name} 
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Services;