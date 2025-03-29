import api from "@/api";
import { ContactTypeValues } from "@/validations/contact";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface IContactResponse {
  id: number;
  link: string;
  type: ContactTypeValues;
  priority: number;
  is_active: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  payload: IContactResponse[];
}

const useContacts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<ApiResponse>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await api.get("/manager/contacts", { params: {
        limit: 50,
        page: 1,
        order_direction: "desc",
        order_by: "priority"
      }});
      return res.data;
    }
  });
  const contacts = useMemo(() => data ? data.payload : [], [data]);

  return { 
    data,
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useContacts;