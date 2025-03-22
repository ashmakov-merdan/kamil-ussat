"use client"
import api from "@/api";
import { Fields } from "@/constants/fields";
import { createServiceValidation, CreateServiceValidation } from "@/validations/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UpdateServiceParams {
  id: number;
  data: Partial<CreateServiceValidation>;
}

const fields = new Fields();

const useUpdate = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const serviceId = params?.id as string;

  const methods = useForm<CreateServiceValidation>({
    resolver: zodResolver(createServiceValidation),
    defaultValues: {
      priority: 1,
      files: [],
      is_active: true
    }
  });
  
  const { handleSubmit, reset } = methods;

  // Fetch service data
  const { data: serviceData, isLoading } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      const res = await api.get(`/manager/services/${serviceId}`);
      return res.data;
    },
    enabled: !!serviceId
  });

  // Update form with fetched data
  useEffect(() => {
    if (serviceData?.payload) {
      const service = serviceData.payload;
      reset({
        name: service.name,
        description: service.description,
        slug: service.slug,
        priority: service.priority,
        is_active: service.is_active,
        files: service.files || []
      });
    }
  }, [serviceData, reset]);

  // Update service mutation
  const { mutate: updateService, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdateServiceParams) => {
      const res = await api.patch(`/manager/services/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Service updated successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["service", serviceId] });
      router.push("/admin/services");
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update service";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: CreateServiceValidation) => {
    if (!serviceId) return;
    
    updateService({
      id: parseInt(serviceId),
      data: values
    });
  }, [serviceId, updateService]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    isLoading,
    fields: fields.features,
    serviceId
  };
};

export default useUpdate;