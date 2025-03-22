"use client"
import { useAuthStore } from "@/store";
import { removeSession } from "@/utils/session";
import { useCallback } from "react";

const useLogout = () => {
  const { setUser } = useAuthStore();

  const onSubmit = useCallback(() => {
    setUser(null);
    removeSession();
  }, []);

  return { onSubmit };
};

export default useLogout;