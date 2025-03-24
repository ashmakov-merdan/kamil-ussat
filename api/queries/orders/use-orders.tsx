import api from "@/api";
import { usePagination } from "@/hooks";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useMemo } from "react";

const useOrders = () => {
  const locale = useLocale();
  const { limit, page, nextPage, prevPage } = usePagination();
  const { data } = useQuery({
    queryKey: ["orders", limit, page, locale],
    queryFn: async (): Promise<{ payload: IOrder[] }> => {
      const res = await api.get("/manager/orders", {
        params: clearEmpty({
          page,
          limit,
          order_direction: "asc",
          order_by: "id",
          lang: locale
        })
      });
      return res.data
    }
  });
  const orders = useMemo<IOrder[]>(() => data ? data.payload : [], [data]);

  return {
    orders,
    page,
    nextPage,
    prevPage,
  }
};

export default useOrders;