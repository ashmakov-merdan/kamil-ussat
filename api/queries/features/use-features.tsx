"use client"
import api from "@/api";
import usePagination from "@/hooks";
import useFilter from "@/hooks/use-filter";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useFeatures = () => {
  const { page, limit, nextPage, prevPage } = usePagination();
  const { filters } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["features", page],
    queryFn: async () => {
      const res = await api.get(`/manager/features`, { params: clearEmpty({ ...filters, page, limit})});
      return res.data;
    }
  });

  const features: IFeature[] = useMemo<IFeature[]>(() => data ? data.payload : [], [data]);

  return {
    features,
    isLoading,
    nextPage,
    prevPage,
    page
  };
};

export default useFeatures; 