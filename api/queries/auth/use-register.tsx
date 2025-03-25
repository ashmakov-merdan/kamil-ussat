"use client"
import api from "@/api";
import { registerValidation, RegisterValues } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSend from "./use-send";

const useRegister = () => {
  const t = useTranslations();
  const locale = useLocale();
  const methods = useForm({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      lang: "tk",
      mode: "light"
    }
  });
  const { handleSubmit, watch } = methods;
  const email = watch("email");

  const { sendOTP, isSending } = useSend();

  const { mutate: register, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values: RegisterValues) => {
      const data = {
        ...values,
        birthdate: new Date(values.birthdate).toISOString().split("T")[0],
        otp: Number(values.otp)
      }
      const res = await api.post("/authentications/registration", data);
      return res.data
    },
    onSuccess: (data) => {
      toast.success(t("alert.registered"));
    },
    onError: (error: any) => {
      console.log(error);
    }
  });

  const onSend = useCallback(async () => {
    if (!email) {
      toast.error(t("alert.provide-email"))
      return;
    };

    sendOTP({
      email,
      lang: locale
    })
  }, [email, locale]);

  const onSubmit = useCallback(async (values: RegisterValues) => {
    register(values);
  }, []);

  return {
    methods,
    onSend,
    isSending,
    onSubmit: handleSubmit(onSubmit),
    isPending
  };
};

export default useRegister;