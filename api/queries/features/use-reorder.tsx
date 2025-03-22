"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ReorderFeatureParams {
  id: number;
  priority?: number;
  is_active?: boolean;
}

const useReorderFeatures = () => {
  const queryClient = useQueryClient();

  const { mutate: reorderFeatures, isPending } = useMutation({
    mutationFn: async ({ id, priority, is_active }: ReorderFeatureParams) => {
      const res = await api.patch(`/manager/features/${id}`, { 
        priority, 
        is_active 
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update feature";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  return { reorderFeatures, isPending };
};

export default useReorderFeatures; 