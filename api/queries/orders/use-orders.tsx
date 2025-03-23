import api from "@/api";
import { usePagination } from "@/hooks";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useOrders = () => {
  const { limit, page, nextPage, prevPage } = usePagination();
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/manager/orders", { params: clearEmpty({
        page,
        limit,
        order_direction: "asc",
        order_by: "id"
      })});
      return res.data
    }
  });
  const orders = useMemo(() => data ? data.payload : [], [data]);

  return {
    page,
    nextPage,
    prevPage,

  }
};

export default useOrders;