"use client"
import api from "@/api";
import { Fields } from "@/constants/fields";
import { productValidation, ProductValues, updateProductValidation } from "@/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UpdateProductParams {
  id: number;
  data: Partial<ProductValues>;
}

const fields = new Fields();

const useUpdate = () => {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const productId = params?.id as string;

  const methods = useForm<Omit<ProductValues, "slug">>({
    resolver: zodResolver(updateProductValidation)
  });

  const { handleSubmit, reset } = methods;

  // Fetch product data
  const { data: productData, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await api.get(`/manager/products/${productId}`);
      return res.data;
    },
    enabled: !!productId
  });

  // Update form with fetched data
  useEffect(() => {
    if (productData?.payload) {
      const product = productData.payload;
      reset({
        name: product.name,
        description: product.description,
        priority: product.priority,
        is_active: product.is_active,
        files: product.files || []
      });
    }
  }, [productData, reset]);

  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdateProductParams) => {
      const res = await api.patch(`/manager/products/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.updated"));
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      router.push("/admin/products");
    },
    onError: (error: any) => {
      let errorMessage = "Failed to update product";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    }
  });

  const onSubmit = useCallback((values: Omit<ProductValues, "slug">) => {
    if (!productId) return;

    updateProduct({
      id: parseInt(productId),
      data: values
    });
  }, [productId, updateProduct]);

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    isPending,
    isLoading,
    fields: fields.features,
    productId
  };
};

export default useUpdate; 