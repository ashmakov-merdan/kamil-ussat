import api from "@/api"
import { contactValidation, ContactValues } from "@/validations/contact"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface UpdateContactParams {
  id: number
  data: ContactValues
}

interface UseUpdateOptions {
  onSuccess?: () => void;
}

const useUpdate = (contactId?: number, initialData?: Partial<ContactValues>, options?: UseUpdateOptions) => {
  const t = useTranslations()
  const queryClient = useQueryClient()
  
  const methods = useForm<ContactValues>({
    resolver: zodResolver(contactValidation),
    defaultValues: initialData
  })
  
  const { handleSubmit, reset } = methods

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-contact", contactId],
    mutationFn: async ({ id, data }: UpdateContactParams) => {
      const res = await api.patch(`/manager/contacts/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      toast.success(t("alert.updated"))
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
      
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (err: any) => {
      console.log(err)
      toast.error("Failed to update contact")
    }
  })

  const onUpdate = useCallback((values: ContactValues) => {
    if (!contactId) return
    
    mutate({
      id: contactId,
      data: values
    })
  }, [contactId, mutate])

  return { 
    methods, 
    isPending, 
    onUpdate: handleSubmit(onUpdate),
    reset
  }
}

export default useUpdate