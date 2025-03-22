"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ReorderPartnerParams {
  id: number;
  priority?: number;
  is_active?: boolean;
}

const useReorderPartners = () => {
  const queryClient = useQueryClient();

  const { mutate: reorderPartners, isPending } = useMutation({
    mutationFn: async ({ id, priority, is_active }: ReorderPartnerParams) => {
      const res = await api.patch(`/manager/partners/${id}`, { 
        priority, 
        is_active 
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update partner";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  return { reorderPartners, isPending };
};

export default useReorderPartners; 