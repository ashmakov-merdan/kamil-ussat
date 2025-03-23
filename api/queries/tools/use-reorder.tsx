"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UpdateToolParams {
  id: number;
  priority?: number;
  is_active?: boolean;
}

const useReorderTools = () => {
  const queryClient = useQueryClient();

  const { mutate: reorderTools, isPending } = useMutation({
    mutationKey: ["reorder-tools"],
    mutationFn: async ({ id, priority, is_active }: UpdateToolParams) => {
      const payload: Record<string, any> = {};
      if (priority !== undefined) payload.priority = priority;
      if (is_active !== undefined) payload.is_active = is_active;
      
      const res = await api.patch(`/manager/tools/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update tool";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  return {
    reorderTools,
    isPending
  };
};

export default useReorderTools; 