"use client"
import api from "@/api";
import { partnerValidation, PartnerValues, updatePartnerValidation } from "@/validations/partner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UpdatePartnerParams {
  id: number;
  data: Partial<PartnerValues>;
}

const useUpdate = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const partnerId = params?.id as string;

  const methods = useForm<Omit<PartnerValues, "slug">>({
    resolver: zodResolver(updatePartnerValidation),
    defaultValues: {
      priority: 1,
      files: [],
      is_active: true
    }
  });
  
  const { handleSubmit, reset } = methods;

  // Fetch partner data
  const { data: partnerData, isLoading } = useQuery({
    queryKey: ["partner", partnerId],
    queryFn: async () => {
      const res = await api.get(`/manager/partners/${partnerId}`);
      return res.data;
    },
    enabled: !!partnerId
  });

  // Update form with fetched data
  useEffect(() => {
    if (partnerData?.payload) {
      const partner = partnerData.payload;
      reset({
        name: partner.name,
        description: partner.description,
        priority: partner.priority,
        is_active: partner.is_active,
        files: partner.files || []
      });
    }
  }, [partnerData, reset]);

  // Update partner mutation
  const { mutate: updatePartner, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdatePartnerParams) => {
      const res = await api.patch(`/manager/partners/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Partner updated successfully");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      queryClient.invalidateQueries({ queryKey: ["partner", partnerId] });
      router.push("/admin/partners");
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update partner";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: Omit<PartnerValues, "slug">) => {
    if (!partnerId) return;
    
    updatePartner({
      id: parseInt(partnerId),
      data: values
    });
  }, [partnerId, updatePartner]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    isLoading,
    partnerId
  };
};

export default useUpdate; 