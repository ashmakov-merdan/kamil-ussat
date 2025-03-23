"use client"
import { ServiceCard, Title } from "@/shared";
import { FC, ReactNode, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { clearEmpty } from "@/utils";
import { useLocale } from "next-intl";

const Services: FC = () => {
  const locale = useLocale();

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

  console.log(services);

  return (
    <section id={"services"} className="px-4 2xl:px-0 container mx-auto pt-16 lg:pt-24 pb-32 lg:pb-40">
      <div>
        <Title
          title="Services"
          desc="More services"
        />
      </div>
      <div className="pt-12 grid gap-x-6 gap-y-10">
        {services.reduce((acc: ReactNode[], _, index) => {
          if (index % 5 === 0) {
            acc.push(
              <div key={`group-${index}`} className="hidden lg:grid lg:grid-cols-3 gap-6">
                {services.slice(index, index + 3).map((service, i) => (
                  <ServiceCard key={`service-${index + i}`} title={service.name} />
                ))}
              </div>
            );
          }
          if (index % 5 === 3) {
            acc.push(
              <div key={`group-${index}-second`} className="hidden lg:grid lg:grid-cols-2 gap-6">
                {services.slice(index, index + 2).map((service, i) => (
                  <ServiceCard key={`service-${index + i}`} title={service.name} />
                ))}
              </div>
            );
          }
          return acc;
        }, [])}

        {services.reduce((acc: ReactNode[], service, index) => {
          if (index % 3 === 0) {
            acc.push(
              <div key={`tablet-single-${index}`} className="hidden sm:block lg:hidden">
                <ServiceCard title={service.name} />
              </div>
            );
          } else if (index % 3 === 1 && index + 1 < services.length) {
            acc.push(
              <div key={`tablet-double-${index}`} className="hidden sm:grid sm:grid-cols-2 lg:hidden gap-6">
                <ServiceCard title={service.name} />
                <ServiceCard title={services[index + 1].name} />
              </div>
            );
          }
          return acc;
        }, [])}

        {services.map((service, index) => (
          <div key={`mobile-single-${index}`} className="sm:hidden">
            <ServiceCard title={service.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;