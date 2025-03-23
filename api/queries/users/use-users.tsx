import api from "@/api";
import { useFilter, usePagination } from "@/hooks";
import { clearEmpty } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const useUsers = () => {
  const { limit, page, prevPage, nextPage } = usePagination();
  const { filters } = useFilter();
  const [status, setStatus] = useState<'active' | 'blocked' | 'deactive'>('active');

  const { data, refetch } = useQuery({
    queryKey: ["users", page, limit, status],
    queryFn: async (): Promise<{ payload: IUser[] }> => {
      const res = await api.get("/manager/users", {
        params: clearEmpty({
          ...filters,
          limit,
          page,
          order_by: "id",
          status
        })
      });
      return res.data;
    }
  });
  const users = useMemo<IUser[]>(() => data ? data.payload : [], [data]);

  const onChangeStatus = (newStatus: 'active' | 'blocked' | 'deactive') => {
    setStatus(newStatus);
  };

  return { page, users, nextPage, prevPage, status, onChangeStatus, refetch };
};

export default useUsers;