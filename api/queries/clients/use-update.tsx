"use client"
import api from "@/api";
import { Fields } from "@/constants/fields";
import { clientValidation, ClientValues } from "@/validations/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UpdateClientParams {
  id: number;
  data: Partial<ClientValues>;
}

const useUpdate = () => {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const clientId = params?.id as string;

  const methods = useForm<ClientValues>({
    resolver: zodResolver(clientValidation),
    defaultValues: {
      priority: 1,
      files: [],
      is_active: true
    }
  });
  
  const { handleSubmit, reset } = methods;

  const { data: clientData, isLoading } = useQuery({
    queryKey: ["client", clientId],
    queryFn: async () => {
      const res = await api.get(`/manager/clients/${clientId}`);
      return res.data;
    },
    enabled: !!clientId
  });

  useEffect(() => {
    if (clientData?.payload) {
      const client = clientData.payload;
      reset({
        name: client.name,
        priority: client.priority,
        is_active: client.is_active,
        files: client.files || []
      });
    }
  }, [clientData, reset]);

  const { mutate: updateClient, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdateClientParams) => {
      const res = await api.patch(`/manager/clients/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.updated"));
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["client", clientId] });
      router.push("/admin/clients");
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update client";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: ClientValues) => {
    if (!clientId) return;
    
    updateClient({
      id: parseInt(clientId),
      data: values
    });
  }, [clientId, updateClient]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    isLoading,
    clientId
  };
};

export default useUpdate; 