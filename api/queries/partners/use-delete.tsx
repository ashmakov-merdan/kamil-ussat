"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeletePartnerParams {
  id: number;
}

const useDeletePartner = () => {
  const queryClient = useQueryClient();

  const { mutate: deletePartner, isPending } = useMutation({
    mutationKey: ["delete-partner"],
    mutationFn: async ({ id }: DeletePartnerParams) => {
      const res = await api.delete(`/manager/partners/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Partner deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to delete partner";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  return { deletePartner, isPending };
};

export default useDeletePartner; 