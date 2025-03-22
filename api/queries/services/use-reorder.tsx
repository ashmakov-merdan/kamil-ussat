"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UpdateServiceParams {
  id: number;
  priority?: number;
  is_active?: boolean;
}

const useReorderServices = () => {
  const queryClient = useQueryClient();

  const { mutate: reorderServices, isPending } = useMutation({
    mutationKey: ["reorder-services"],
    mutationFn: async ({ id, priority, is_active }: UpdateServiceParams) => {
      const payload: Record<string, any> = {};
      if (priority !== undefined) payload.priority = priority;
      if (is_active !== undefined) payload.is_active = is_active;
      
      const res = await api.patch(`/manager/services/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update service";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  return {
    reorderServices,
    isPending
  };
};

export default useReorderServices; 