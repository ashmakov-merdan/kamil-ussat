import { userValidation, UserValues } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreate = () => {
  const queryClient = useQueryClient();
  const methods = useForm<UserValues>({
    resolver: zodResolver(userValidation)
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (data: UserValues) => {
      const response = await api.post("/manager/users", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
      methods.reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create user");
    }
  });

  const onSubmit = handleSubmit((data) => mutate(data));
  
  return { methods, onSubmit, isSubmitting: isPending };
};

export default useCreate;