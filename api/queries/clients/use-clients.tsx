"use client"
import api from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";

interface IClient {
  id: number;
  name: string;
  priority: number;
  is_active: boolean;
  slug: string;
  files: {
    path: string;
    blurhash: string;
  }[];
}

const useClients = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["clients", page],
    queryFn: async () => {
      const res = await api.get(`/manager/clients?page=${page}`);
      return res.data;
    }
  });

  const clients: IClient[] = data?.payload?.data || [];
  const totalPages = data?.payload?.last_page || 1;

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  return {
    clients,
    isLoading,
    nextPage,
    prevPage,
    page,
    totalPages
  };
};

export default useClients; 