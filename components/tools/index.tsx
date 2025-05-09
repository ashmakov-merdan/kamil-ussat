"use client"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl";
import { FC, useMemo } from "react";
import { BASE_URL } from "@/api";
import Image from "next/image";
import { Shadow, Title } from "@/shared";

const Tools: FC = () => {
  const locale = useLocale();
  const t = useTranslations();
  const { data } = useQuery({
    queryKey: ["tools", locale],
    queryFn: async (): Promise<{ payload: ITool[] }> => {
      const res = await api.get("/tools", {
        params: {
          limit: 40,
          page: 1,
          order_direction: "asc",
          order_by: "id",
          lang: locale
        }
      });
      return res.data
    }
  });
  const tools = useMemo<ITool[]>(() => data ? data.payload : [], [data]);

  const firstHalf = useMemo(() => tools.slice(0, Math.ceil(tools.length / 2)), [tools]);
  const secondHalf = useMemo(() => tools.slice(Math.ceil(tools.length / 2)), [tools]);

  const shouldAnimateRow1 = firstHalf.length > 3;
  const shouldAnimateRow2 = secondHalf.length > 3;

  return tools.length > 0 && (
    <section id="tools" className="bg-[#F9FAFB] dark:bg-[#161B26] py-12">
      <div className="relative container mx-auto">
        <Shadow className="w-10 lg:w-80 from-[#F9FAFB] dark:from-[#161B26]" />
        <div className="flex flex-col gap-y-3 md:gap-y-5">
          <Title
            title={t("section.tools")}
            desc={t("tools.heading")}
          />
          <div className="lg:max-w-3xl w-full mx-auto lg:px-12">
            <p className="text-base sm:text-[18px] md:text-xl font-normal text-[#94969C] text-center">{t("tools.subheading")}</p>
          </div>
        </div>

        <div className="pt-16">
          <div className="overflow-hidden py-6 relative">
            <div className={`flex gap-2 md:gap-8 ${shouldAnimateRow1 ? "w-max animate-slide" : "flex-wrap justify-center"}`}>
              {firstHalf.map((tool, index) => (
                <div key={index} className="w-[90px] md:w-40 flex flex-col items-center justify-center flex-shrink-0">
                  <div className="w-16 h-16 flex justify-center items-center rounded-xl">
                    <Image
                      width={64}
                      height={64}
                      src={`${BASE_URL}/${tool.files[0]?.path || ''}`}
                      alt={typeof tool.name === 'object' ? tool.name[locale] || '' : tool.name}
                    />
                  </div>
                </div>
              ))}
              {shouldAnimateRow1 && firstHalf.map((tool, index) => (
                <div key={index + firstHalf.length} className="w-[90px] md:w-40 flex flex-col items-center justify-center flex-shrink-0">
                  <div className="w-16 h-16 flex justify-center items-center rounded-xl">
                    <Image
                      width={64}
                      height={64}
                      src={`${BASE_URL}/${tool.files[0]?.path || ''}`}
                      alt={typeof tool.name === 'object' ? tool.name[locale] || '' : tool.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden py-6 relative">
            <div className={`flex gap-2 md:gap-8 ${shouldAnimateRow2 ? "w-max animate-slide-reverse" : "flex-wrap justify-center"}`}>
              {secondHalf.map((tool, index) => (
                <div key={index} className="w-[90px] md:w-40 flex flex-col items-center justify-center flex-shrink-0">
                  <div className="w-16 h-16 flex justify-center items-center rounded-xl">
                    <Image
                      width={64}
                      height={64}
                      src={`${BASE_URL}/${tool.files[0]?.path || ''}`}
                      alt={typeof tool.name === 'object' ? tool.name[locale] || '' : tool.name}
                    />
                  </div>
                </div>
              ))}
              {shouldAnimateRow2 && secondHalf.map((tool, index) => (
                <div key={index + secondHalf.length} className="w-[90px] md:w-40 flex flex-col items-center justify-center flex-shrink-0">
                  <div className="w-16 h-16 flex justify-center items-center rounded-xl">
                    <Image
                      width={64}
                      height={64}
                      src={`${BASE_URL}/${tool.files[0]?.path || ''}`}
                      alt={typeof tool.name === 'object' ? tool.name[locale] || '' : tool.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;