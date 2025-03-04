import { ServiceCard, Title } from "@/shared";
import { FC, ReactNode } from "react";
import services from "@/.examples/services";

const Services: FC = () => {
  return (
    <section id={"services"} className="container mx-auto pt-24 pb-40">
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
              <div key={`group-${index}`} className="grid grid-cols-3 gap-6">
                {services.slice(index, index + 3).map((service, i) => (
                  <ServiceCard key={`service-${index + i}`} title={service} />
                ))}
              </div>
            );
          }
          if (index % 5 === 3) {
            acc.push(
              <div key={`group-${index}-second`} className="grid grid-cols-2 gap-6">
                {services.slice(index, index + 2).map((service, i) => (
                  <ServiceCard key={`service-${index + i}`} title={service} />
                ))}
              </div>
            );
          }
          return acc;
        }, [])}
      </div>
    </section>
  )
};

export default Services;