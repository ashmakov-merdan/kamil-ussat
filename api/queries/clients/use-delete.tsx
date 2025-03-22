"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeleteClientParams {
  id: number;
}

const useDeleteClient = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteClient, isPending } = useMutation({
    mutationKey: ["delete-client"],
    mutationFn: async ({ id }: DeleteClientParams) => {
      const res = await api.delete(`/manager/clients/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Client deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to delete client";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  return { deleteClient, isPending };
};

export default useDeleteClient; 