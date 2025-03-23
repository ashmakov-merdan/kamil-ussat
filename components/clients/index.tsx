"use client"
import { Subheading } from "@/shared";
import { FC, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import api, { BASE_URL } from "@/api";
import { clearEmpty } from "@/utils";

const Clients: FC = () => {
  const t = useTranslations("header");
  const { data } = useQuery({
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

  return clients && (
    <div className="px-4 py-8 flex flex-col gap-y-8">
      <div className="flex items-center justify-center">
        <Subheading text={t("our-clients")} />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        {clients.map((client, i) => <Image
          width={180}
          height={90}
          key={i}
          src={`${BASE_URL}/${client.files[0].path}`}
          alt={`${client.name}-${i}`}
        />)}
      </div>
    </div>
  )
};

export default Clients;