import api from "@/api";
import { useFilter, usePagination } from "@/hooks";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { FC, useMemo } from "react";

export interface ITool {
  id: number;
  name: any; // Multilingual object (tk, ru, en)
  description: any; // Multilingual object (tk, ru, en)
  priority: number;
  is_active: boolean;
  slug: string;
  files: Array<{
    path: string;
    blurhash: string;
  }>;
}

const useTools = () => {
  const { limit, page, nextPage, prevPage } = usePagination();
  const { filters } = useFilter();

  const { data } = useQuery({
    queryKey: ["tools", page, filters],
    queryFn: async () => {
      const res = await api.get("/tools", { params: clearEmpty({
        page,
        limit,
        ...filters
      })});
      return res.data;
    }
  });
  const tools = useMemo(() => data ? data.payload : [], [data]);

  return { tools, nextPage, prevPage, page };
};

export default useTools;