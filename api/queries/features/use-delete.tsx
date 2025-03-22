"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeleteFeatureParams {
  id: number;
}

const useDeleteFeature = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteFeature, isPending } = useMutation({
    mutationKey: ["delete-feature"],
    mutationFn: async ({ id }: DeleteFeatureParams) => {
      const res = await api.delete(`/manager/features/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Feature deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["features"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to delete feature";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  return { deleteFeature, isPending };
};

export default useDeleteFeature;