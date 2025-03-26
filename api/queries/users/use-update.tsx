import { updateUserValidation, UpdateUserValues } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";

const useUpdate = (userId?: number, initialData?: Partial<IUser>) => {
  const queryClient = useQueryClient();
  const methods = useForm<UpdateUserValues>({
    resolver: zodResolver(updateUserValidation),
    defaultValues: initialData ? {
      first_name: initialData.first_name,
      last_name: initialData.last_name,
      status: initialData.status,
      role: initialData.role
    } : undefined
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (initialData) {
      reset({
        first_name: initialData.first_name,
        last_name: initialData.last_name,
        status: initialData.status,
        role: initialData.role
      });
    }
  }, [initialData, reset]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-user", userId],
    mutationFn: async (data: UpdateUserValues) => {
      if (!userId) throw new Error("User ID is required");
      const response = await api.patch(`/manager/users/${userId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update user");
    }
  });

  const onSubmit = handleSubmit((data) => mutate(data));
  
  return { methods, onSubmit, isSubmitting: isPending };
};

export default useUpdate; 