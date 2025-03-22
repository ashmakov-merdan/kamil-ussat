"use client"
import api from "@/api";
import { registerValidation, RegisterValues } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useRegister = () => {
  const methods = useForm({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      lang: "tk",
      mode: "light"
    }
  });
  const { handleSubmit, watch } = methods;
  const email = watch("email");

  const { mutate: sendOTP, isPending: isSending } = useMutation({
    mutationKey: ["send-otp"],
    mutationFn: async (value: Record<string, string>) => {
      const res = await api.post('/authentications/send-otp', value);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Verification code is sent to your e-mail")
    },
    onError: (error: any) => {
      console.log(error);
    }
  })

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
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    }
  });

  const onSend = useCallback(async () => {
    if (!email) {
      toast.error("Please, provide your email")
      return;
    };

    sendOTP({
      email,
      lang: "tk"
    })
  }, [email]);

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