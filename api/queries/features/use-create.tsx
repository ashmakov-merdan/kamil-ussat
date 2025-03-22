"use client"
import api from "@/api";
import { Fields } from "@/constants/fields";
import { featureValidation, FeatureValues } from "@/validations/feature";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const fields = new Fields();

const useCreateFeature = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<FeatureValues>({
    resolver: zodResolver(featureValidation),
    defaultValues: {
      is_active: true,
      priority: 1,
      files: []
    }
  });
  const { handleSubmit } = methods;
  
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-feature"],
    mutationFn: async (values: FeatureValues) => {
      const res = await api.post("/manager/features", values);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Feature created successfully");
      queryClient.invalidateQueries({ queryKey: ["features"] });
      router.push("/admin/features");
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to create feature";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: FeatureValues) => {
    mutate(values);
  }, [mutate]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    fields: fields.features
  };
};

export default useCreateFeature;