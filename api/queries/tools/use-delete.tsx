"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface DeleteToolParams {
  id: number;
}

const useDeleteTool = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const { mutate: deleteTool, isPending } = useMutation({
    mutationKey: ["delete-tool"],
    mutationFn: async ({ id }: DeleteToolParams) => {
      const res = await api.delete(`/manager/tools/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.deleted"));
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to delete tool";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    }
  });

  return {
    deleteTool,
    isPending
  };
};

export default useDeleteTool; 