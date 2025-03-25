"use client"
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface DeleteProductParams {
  id: number;
}

const useDeleteProduct = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async ({ id }: DeleteProductParams) => {
      const res = await api.delete(`/manager/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.deleted"));
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to delete product";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    }
  });

  return {
    deleteProduct,
    isPending
  };
};

export default useDeleteProduct; 