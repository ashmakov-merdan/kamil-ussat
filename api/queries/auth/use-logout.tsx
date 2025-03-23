"use client"
import { useAuthStore } from "@/store";
import { removeSession } from "@/utils/session";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useLogout = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const onSubmit = useCallback(() => {
    setUser(null);
    router.replace("/");
    removeSession();
  }, []);

  return { onSubmit };
};

export default useLogout;