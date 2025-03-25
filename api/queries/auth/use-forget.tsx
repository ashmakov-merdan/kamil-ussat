"use client"
import { forgetValidation, ForgetValues } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSend from "./use-send";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { useRouter } from "next/navigation";

const useForget = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const methods = useForm<ForgetValues>({
    resolver: zodResolver(forgetValidation)
  });
  const { handleSubmit, watch } = methods;
  const email = watch("email");
  const { sendOTP, isSending } = useSend();

  const { mutate, isPending } = useMutation({
    mutationKey: ["forget-password"],
    mutationFn: async (values: ForgetValues) => {
      const res = await api.post('/authentications/forgot-password', values);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password changed");
      router.replace("/login");
    },
    onError: (error: any) => {
      if(error && error.response.data.message){
        const message = error.response.data.message;
        if(message === "User not found"){
          toast.error(t("alert.user-not-found"));
        }
      }
    }
  })

  const onSend = useCallback(async () => {
    if(!email){
      toast.error(t("alert.provide-email"));
      return;
    };

    sendOTP({
      email,
      lang: locale
    })
  }, [email, locale]);

  const onSubmit = useCallback(async (values: ForgetValues) => {
    mutate(values);
  }, []);

  return {
    methods,
    onSend,
    isSending,
    onSubmit: handleSubmit(onSubmit),
    isPending
  }
};

export default useForget;