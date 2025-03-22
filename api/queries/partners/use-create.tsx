"use client"
import api from "@/api";
import { partnerValidation, PartnerValues } from "@/validations/partner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useCreatePartner = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<PartnerValues>({
    resolver: zodResolver(partnerValidation),
    defaultValues: {
      is_active: true,
      priority: 1,
      files: []
    }
  });
  const { handleSubmit } = methods;
  
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-partner"],
    mutationFn: async (values: PartnerValues) => {
      const res = await api.post("/manager/partners", values);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Partner created successfully");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      router.push("/admin/partners");
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to create partner";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: PartnerValues) => {
    mutate(values);
  }, [mutate]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending
  };
};

export default useCreatePartner;