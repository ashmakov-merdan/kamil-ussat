"use client"
import api from "@/api";
import { Fields } from "@/constants/fields";
import { createToolValidation, ToolValues } from "@/validations/tools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UpdateToolParams {
  id: number;
  data: Partial<ToolValues>;
}

const fields = new Fields();

const useUpdateTool = () => {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const toolId = params?.id as string;

  const methods = useForm<Omit<ToolValues, "slug">>({
    resolver: zodResolver(createToolValidation)
  });

  const { handleSubmit, reset } = methods;

  // Fetch tool data
  const { data: toolData, isLoading } = useQuery({
    queryKey: ["tool", toolId],
    queryFn: async () => {
      const res = await api.get(`/manager/tools/${toolId}`);
      return res.data;
    },
    enabled: !!toolId
  });

  // Update form with fetched data
  useEffect(() => {
    if (toolData?.payload) {
      const tool = toolData.payload;
      reset({
        name: tool.name,
        description: tool.description,
        priority: tool.priority,
        is_active: tool.is_active,
        files: tool.files || []
      });
    }
  }, [toolData, reset]);

  const { mutate: updateTool, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdateToolParams) => {
      const res = await api.patch(`/manager/tools/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.updated"));
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      queryClient.invalidateQueries({ queryKey: ["tool", toolId] });
      router.push("/admin/tools");
    },
    onError: (error: any) => {
      let errorMessage = "Failed to update tool";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: Omit<ToolValues, "slug">) => {
    if (!toolId) return;

    updateTool({
      id: parseInt(toolId),
      data: values
    });
  }, [toolId, updateTool]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    isLoading,
    fields: fields.features,
    toolId
  };
};

export default useUpdateTool; 