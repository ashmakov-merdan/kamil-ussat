"use client"
import api from "@/api";
import { Heading, Shadow } from "@/shared";
import Carousel from "@/shared/carousel";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { FC, useMemo } from "react";

const Companies: FC = () => {
  const locale = useLocale();
  const t = useTranslations();
  const { data } = useQuery({
    queryKey: ["partners"],
    queryFn: async (): Promise<{ payload: IPartner[]}> => {
      const res = await api.get("/patrners", { params: clearEmpty({
        page: 1,
        limit: 50,
        lang: locale,
        order_direction: "asc",
        order_by: "priority"
      })});
      return res.data;
    }
  });
  const partners = useMemo<IPartner[]>(() => data ? data.payload : [], [data]);

  return partners.length > 0 && (
  <section id={"collaborates"} className="bg-[#F9FAFB] dark:bg-[#161B26] py-12">
      <div className="relative container mx-auto">
        <Shadow className="w-10 lg:w-80 from-[#F9FAFB] dark:from-[#161B26]" />
        <div className="text-center">
          <Heading text={t("collaborates.heading")} />
        </div>
        <div className="pt-16">
          <Carousel partners={partners} />
        </div>
      </div>
    </section>
  )
};

export default Companies;