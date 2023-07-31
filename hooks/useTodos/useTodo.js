import {
  addTodo,
  deleteTodo,
  getTodos,
  statusTodo,
  updateTodo,
} from "@/api/todosApi";
import { useMutation, useQuery, useQueryClient } from "react-query";

const postQuery = () => {
  return useQuery({
    queryKey: ["todos", "get"],
    queryFn: getTodos,
  });
};

const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

const useUpdateToDoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};
const useDeleteToDoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};
const useStatusToDoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(statusTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useTodo = () => {
  return {
    postQuery,
    useAddTodoMutation,
    useUpdateToDoMutation,
    useDeleteToDoMutation,
    useStatusToDoMutation,
  };
};
