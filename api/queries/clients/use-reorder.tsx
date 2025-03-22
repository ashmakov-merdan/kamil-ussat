"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ReorderClientParams {
  id: number;
  priority?: number;
  is_active?: boolean;
}

const useReorderClients = () => {
  const queryClient = useQueryClient();

  const { mutate: reorderClients, isPending } = useMutation({
    mutationFn: async ({ id, priority, is_active }: ReorderClientParams) => {
      const res = await api.patch(`/manager/clients/${id}`, { 
        priority, 
        is_active 
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update client";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  return { reorderClients, isPending };
};

export default useReorderClients; 