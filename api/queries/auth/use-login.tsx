"use client"
import { loginValidation, LoginValues } from "@/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { useAuthStore } from "@/store";
import { createSession } from "@/utils/session";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

type Response = {
  token: {
    access: {
      token: string
    }
    refresh: string
  }
} & IUser

const useLogin = () => {
  const t = useTranslations();
  const { setUser } = useAuthStore();
  const router = useRouter();

  const methods = useForm<LoginValues>({
    resolver: zodResolver(loginValidation)
  });
  const { handleSubmit } = methods;
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: LoginValues): Promise<{ payload: Response }> => {
      const res = await api.post("/authentications/login", values);
      return res.data
    },
    onSuccess: (data) => {
      const { token, ...user } = data.payload;
      setUser(user);
      createSession(token.access.token, token.refresh);
      toast.success(t("alert.authorized"));
      router.replace("/");
    },
    onError: (error: any) => {
      console.log(error);
      if (error && error.response.data.message) {
        const message = error.response.data.message;

        if (message === "Username or password is invalid") {
          toast.error(t("alert.invalid-credentials"));
        }
      }
    }
  })

  const onSubmit = handleSubmit((values) => {
    mutate(values)
  });

  return {
    methods,
    onSubmit,
    isPending
  };
};

export default useLogin;