"use client"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl";
import { FC, useMemo } from "react";
import { BASE_URL } from "@/api";
import Image from "next/image";
import { Heading, Shadow, Title } from "@/shared";

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

  // Split tools into two rows for alternate direction carousels
  const firstHalf = useMemo(() => tools.slice(0, Math.ceil(tools.length / 2)), [tools]);
  const secondHalf = useMemo(() => tools.slice(Math.ceil(tools.length / 2)), [tools]);

  // Check if we should animate (more than 3 tools in a row)
  const shouldAnimateRow1 = firstHalf.length > 3;
  const shouldAnimateRow2 = secondHalf.length > 3;

  return (
    <section id="tools" className="bg-[#F9FAFB] dark:bg-[#161B26] py-12">
      <div className="relative container mx-auto">
        <Shadow className="w-10 lg:w-80 from-[#F9FAFB] dark:from-[#161B26]" />
        <div className="flex flex-col gap-y-3 md:gap-y-5">
          <Title
            title={"Tools"}
            desc={"Tools that we use"}
          />
          <div className="lg:max-w-3xl w-full mx-auto lg:px-12">
            <p className="text-base sm:text-[18px] md:text-xl font-normal text-[#94969C] text-center">{"We use modern and effective tools for your projects."}</p>
          </div>
        </div>

        <div className="pt-16">
          {/* First row - Left to Right */}
          <div className="overflow-hidden py-6">
            <div className={`flex ${shouldAnimateRow1 ? "w-max animate-slide" : "flex-wrap justify-center"}`}>
              {firstHalf.map((tool, index) => (
                <div key={index} className="w-40 mx-4 flex flex-col items-center justify-center flex-shrink-0">
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
              {/* Duplicate for infinite scroll effect when animating */}
              {shouldAnimateRow1 && firstHalf.map((tool, index) => (
                <div key={index + firstHalf.length} className="w-40 bg-red-500 mx-4 flex flex-col items-center justify-center flex-shrink-0 space-y-3">
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

          {/* Second row - Right to Left */}
          <div className="overflow-hidden py-6">
            <div className={`flex ${shouldAnimateRow2 ? "w-max animate-slide-reverse" : "flex-wrap justify-center"}`}>
              {secondHalf.map((tool, index) => (
                <div key={index} className="w-40 mx-4 flex flex-col items-center justify-center flex-shrink-0 space-y-3">
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
              {/* Duplicate for infinite scroll effect when animating */}
              {shouldAnimateRow2 && secondHalf.map((tool, index) => (
                <div key={index + secondHalf.length} className="w-40 mx-4 flex flex-col items-center justify-center flex-shrink-0 space-y-3">
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