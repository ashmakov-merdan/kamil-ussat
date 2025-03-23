import api from "@/api";
import { orderValidation, OrderValues } from "@/validations/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useCreate = () => {
  const t = useTranslations();
  const methods = useForm<OrderValues>({
    resolver: zodResolver(orderValidation)
  });
  const { handleSubmit, reset } = methods;
  const { mutate } = useMutation({
    mutationKey: ["create-order"],
    mutationFn: async (data: OrderValues) => {
      const res = await api.post('/orders', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.created"))
      reset({
        first_name: "",
        last_name: "",
        email: "",
        description: "",
        service_id: undefined
      })
    },
    onError: (err: any) => {
      console.log(err);
      console.log("Failed to send order");
    }
  })

  const onSubmit = useCallback(async (values: OrderValues) => {
    mutate(values);
  }, []);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit)
  }
};

export default useCreate;