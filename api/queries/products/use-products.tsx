import api from "@/api";
import { useFilter, usePagination } from "@/hooks";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useProducts = () => {
  const { limit, page, prevPage, nextPage } = usePagination();
  const { filters } = useFilter();
  
  const { data } = useQuery({
    queryKey: ["products", page],
    queryFn: async (): Promise<{ payload: IProduct[], totalPages: number }> => {
      const res = await api.get(`/manager/products`, { params: clearEmpty({
        ...filters,
        limit,
        page
      })});
      return res.data;
    }
  });
  
  const products = useMemo<IProduct[]>(() => data ? data.payload : [], [data]);


  return { products, nextPage, prevPage, page };
};

export default useProducts;