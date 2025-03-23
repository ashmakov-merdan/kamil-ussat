"use client"
import api from "@/api";
import { useFilter, usePagination } from "@/hooks";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useClients = () => {
  const { limit, page, nextPage, prevPage } = usePagination();
  const { filters } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["clients", page, limit, filters],
    queryFn: async () => {
      const res = await api.get(`/manager/clients`, { params: clearEmpty({ ...filters, page, limit }) });
      return res.data;
    }
  });

  const clients = useMemo<IClient[]>(() => data ? data.payload : [], [data]);


  return {
    clients,
    isLoading,
    nextPage,
    prevPage,
    page,
  };
};

export default useClients; 