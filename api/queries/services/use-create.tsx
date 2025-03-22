import { Fields } from "@/constants/fields";
import { createServiceValidation, CreateServiceValidation } from "@/validations/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import toast from "react-hot-toast";
import { useCallback } from "react";

const fields = new Fields();

const useCreateService = () => {
  const router = useRouter();

  const methods = useForm<CreateServiceValidation>({
    resolver: zodResolver(createServiceValidation),
    defaultValues: {
      priority: 1,
      files: [],
      is_active: true
    }
  });
  const { handleSubmit, setValue, watch } = methods;

  const { mutate: createService, isPending } = useMutation({
    mutationKey: ["create-service"],
    mutationFn: async (values: CreateServiceValidation) => {
      const res = await api.post("/manager/services", values);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Service created successfully");
      router.push("/admin/services");
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to create service";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: CreateServiceValidation) => {
    createService(values);
  }, []);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending: isPending,
    fields: fields.features,
  }
};

export default useCreateService;