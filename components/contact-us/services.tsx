"use client"
import api from "@/api";
import { Tag } from "@/shared";
import { clearEmpty } from "@/utils";
import { OrderValues } from "@/validations/order";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const OrderServices: FC = () => {
  const { setValue, watch } = useFormContext<OrderValues>()
  const locale = useLocale();
  const { data } = useQuery({
    queryKey: ["features", locale],
    queryFn: async () => {
      const res = await api.get("/features", {
        params: clearEmpty({
          limit: 50,
          page: 1,
          order_direction: "asc",
          order_by: "priority",
          is_active: true,
          lang: locale
        })
      });
      return res.data;
    }
  });
  const services = useMemo<IService[]>(() => data ? data.payload : [], [data]);

  return (
    <div className="flex flex-wrap gap-4">
      {services.map((service) => (
        <Tag
          key={service.id}
          text={service.name}
          isSelected={watch("service_id") === service.id}
          onSelect={() => setValue("service_id", service.id)}
        />
      ))}
    </div>
  )
};

export default OrderServices;