"use client"
import api from "@/api";
import { Fields } from "@/constants/fields";
import { featureValidation, FeatureValues } from "@/validations/feature";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UpdateFeatureParams {
  id: number;
  data: Partial<FeatureValues>;
}

const fields = new Fields();

const useUpdate = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const featureId = params?.id as string;

  const methods = useForm<FeatureValues>({
    resolver: zodResolver(featureValidation),
    defaultValues: {
      priority: 1,
      files: [],
      is_active: true
    }
  });
  
  const { handleSubmit, reset } = methods;

  // Fetch feature data
  const { data: featureData, isLoading } = useQuery({
    queryKey: ["feature", featureId],
    queryFn: async () => {
      const res = await api.get(`/manager/features/${featureId}`);
      return res.data;
    },
    enabled: !!featureId
  });

  // Update form with fetched data
  useEffect(() => {
    if (featureData?.payload) {
      const feature = featureData.payload;
      reset({
        name: feature.name,
        slug: feature.slug,
        priority: feature.priority,
        is_active: feature.is_active,
        files: feature.files || []
      });
    }
  }, [featureData, reset]);

  // Update feature mutation
  const { mutate: updateFeature, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdateFeatureParams) => {
      const res = await api.patch(`/manager/features/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Feature updated successfully");
      queryClient.invalidateQueries({ queryKey: ["features"] });
      queryClient.invalidateQueries({ queryKey: ["feature", featureId] });
      router.push("/admin/features");
    },
    onError: (error: any) => {
      console.error(error);
      let errorMessage = "Failed to update feature";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: FeatureValues) => {
    if (!featureId) return;
    
    updateFeature({
      id: parseInt(featureId),
      data: values
    });
  }, [featureId, updateFeature]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    isLoading,
    fields: fields.features,
    featureId
  };
};

export default useUpdate; 