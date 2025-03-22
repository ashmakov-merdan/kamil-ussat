"use client"
import api from "@/api";
import usePagination from "@/hooks";
import useFilter from "@/hooks/use-filter";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const useServices = () => {
  const { setItemsLength, limit, page, nextPage, prevPage } = usePagination();
  const { filters } = useFilter();

  const { data } = useQuery({
    queryKey: ["services", limit, page, filters],
    queryFn: async (): Promise<{ payload: any }> => {
      const res = await api.get('/manager/services', { params: clearEmpty({ ...filters, limit, page }) });
      return res.data;
    }
  });
  const services = useMemo<IService[]>(() => data ? data.payload : [], [data]);

  useEffect(() => {
    if (services) {
      setItemsLength(services.length);
    };
  }, [services]);

  return { services, page, nextPage, prevPage };
};

export default useServices;