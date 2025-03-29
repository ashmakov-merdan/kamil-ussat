import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import toast from "react-hot-toast";

const useDelete = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-contact"],
    mutationFn: async (id: number) => {
      const res = await api.delete(`/manager/contacts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.deleted"));
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (err: any) => {
      console.log(err);
      toast.error("Failed to delete contact");
    }
  });

  const onDelete = useCallback((id: number) => {
    if (!id) return;
    mutate(id);
  }, [mutate]);

  return { isPending, onDelete };
};

export default useDelete; 