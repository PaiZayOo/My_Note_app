import { registerUser } from "@/api/usersApi";
import { useMutation } from "react-query";

const registerUserMutation = () => {
  return useMutation({
    mutationKey: ["register", "users"],
    mutationFn: registerUser,
  });
};

export const useUserMutation = () => {
  return {
    registerUserMutation,
  };
};
