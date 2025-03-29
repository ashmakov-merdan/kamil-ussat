import api from "@/api";
import { contactValidation, ContactValues } from "@/validations/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UseCreateOptions {
  onSuccess?: () => void;
}

const useCreate = (options?: UseCreateOptions) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  
  // Create form methods
  const methods = useForm<ContactValues>({
    resolver: zodResolver(contactValidation),
    defaultValues: {
      link: "",
      type: "instagram",
      priority: 1,
      is_active: true
    }
  });
  
  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-contact"],
    mutationFn: async (values: ContactValues) => {
      const res = await api.post("/manager/contacts", values);
      return res.data;
    },
    onSuccess: () => {
      toast.success(t("alert.created"));
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      methods.reset();
      
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (err: any) => {
      console.log(err);
      toast.error("Failed to create");
    }
  });

  const onCreate = useCallback((values: ContactValues) => {
    mutate(values);
  }, [mutate]);

  return { 
    isPending, 
    onCreate: handleSubmit(onCreate), 
    methods 
  };
};

export default useCreate;