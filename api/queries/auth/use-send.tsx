"use client"
import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const useSend = () => {
  const t = useTranslations();
  const { mutate: sendOTP, isPending: isSending } = useMutation({
    mutationKey: ["send-otp"],
    mutationFn: async (values: Record<string, string>) => {
      const res = await api.post("/authentications/send-otp", values);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.sent-otp"));
    },
    onError: (error: any) => {
      console.log(error);
    }
  });

  return { sendOTP, isSending };
};

export default useSend;