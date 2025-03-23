import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id: number) => {
      await api.delete(`/manager/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete user");
    }
  });

  return { deleteUser: mutate, isDeleting: isPending };
};

export default useDeleteUser;
