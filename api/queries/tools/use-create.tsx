import { Fields } from "@/constants/fields";
import { createToolValidation, ToolValues } from "@/validations/tools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useTranslations } from "next-intl";

const fields = new Fields();

const useCreateTool = () => {
  const t = useTranslations();
  const router = useRouter();

  const methods = useForm<ToolValues>({
    resolver: zodResolver(createToolValidation),
    defaultValues: {
      priority: 1,
      files: [],
      is_active: true
    }
  });
  const { handleSubmit } = methods;

  const { mutate: createTool, isPending } = useMutation({
    mutationKey: ["create-tool"],
    mutationFn: async (values: ToolValues) => {
      const res = await api.post("/manager/tools", values);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.created"));
      router.push("/admin/tools");
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to create tool";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: ToolValues) => {
    createTool(values);
  }, [createTool]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending: isPending,
    fields: fields.features,
  }
};

export default useCreateTool; 