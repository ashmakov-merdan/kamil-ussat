"use client"
import api from "@/api";
import { clientValidation, ClientValues } from "@/validations/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useCreateClient = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<ClientValues>({
    resolver: zodResolver(clientValidation),
    defaultValues: {
      is_active: true,
      priority: 1,
      files: []
    }
  });
  const { handleSubmit } = methods;
  
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-client"],
    mutationFn: async (values: ClientValues) => {
      const res = await api.post("/manager/clients", values);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Client created successfully");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      router.push("/admin/clients");
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to create client";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: ClientValues) => {
    mutate(values);
  }, [mutate]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
  };
};

export default useCreateClient;