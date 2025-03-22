"use client"
import api from "@/api";
import { usePagination } from "@/hooks";
import useFilter from "@/hooks/use-filter";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const usePartners = () => {
  const { limit, page, nextPage, prevPage } = usePagination();
  const { filters } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["partners", page, limit, filters],
    queryFn: async (): Promise<{ payload: any }> => {
      const res = await api.get(`/manager/partners`, { params: clearEmpty({ ...filters, page, limit }) });
      return res.data;
    }
  });
  const partners: IPartner[] = useMemo(() => data ? data.payload : [], [data]);

  return {
    partners,
    isLoading,
    nextPage,
    prevPage,
    page,
  };
};

export default usePartners; 