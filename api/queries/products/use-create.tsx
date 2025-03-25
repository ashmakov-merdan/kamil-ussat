import api from "@/api";
import { Fields } from "@/constants/fields";
import { productValidation, ProductValues } from "@/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const fields = new Fields();

const useCreate = () => {
  const router = useRouter();
  const t = useTranslations();
  const methods = useForm<ProductValues>({
    resolver: zodResolver(productValidation),
    defaultValues: {
      priority: 1,
      files: [],
      is_active: true
    }
  });
  const { handleSubmit } = methods;
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: async (values: ProductValues) => {
      const res = await api.post("/manager/products", values);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.created"));
      router.push("/admin/products");
    },
    onError: (err: any) => {
      console.log(err);
      let errorMessage = "Failed to create product";

      if(err.message){
        errorMessage = err.message;
      } else if(err?.response?.data.message){
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage);
    }
  })
  const onSubmit = useCallback(async (values: ProductValues) => {
    mutate(values);
  }, []);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    fields: fields.features
  }
};

export default useCreate;