"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface DeleteServiceParams {
  id: number;
}

const useDeleteService = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const { mutate: deleteService, isPending } = useMutation({
    mutationKey: ["delete-service"],
    mutationFn: async ({ id }: DeleteServiceParams) => {
      const res = await api.delete(`/manager/services/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.deleted"));
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to delete service";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    }
  });

  return {
    deleteService,
    isPending
  };
};

export default useDeleteService; 