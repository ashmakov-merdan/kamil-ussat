"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UpdateProductParams {
  id: number;
  priority?: number;
  is_active?: boolean;
}

const useReorderProducts = () => {
  const queryClient = useQueryClient();

  const { mutate: reorderProducts, isPending } = useMutation({
    mutationKey: ["reorder-products"],
    mutationFn: async ({ id, priority, is_active }: UpdateProductParams) => {
      const payload: Record<string, any> = {};
      if (priority !== undefined) payload.priority = priority;
      if (is_active !== undefined) payload.is_active = is_active;
      
      const res = await api.patch(`/manager/products/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update product";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  return {
    reorderProducts,
    isPending
  };
};

export default useReorderProducts; 