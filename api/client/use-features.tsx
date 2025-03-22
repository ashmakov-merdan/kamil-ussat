"use client"
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import api from "../index";

const useFeatures = () => {
  const { data } = useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const res = await api.get('/services', { params: {
        order_direction: "asc",
        order_by: "id",
        limit: 30,
        page: 1
      }});
      return res.data
    }
  });

  const features = useMemo(() => data ? data.payload : [], [data]);

  return { features };
};

export default useFeatures;