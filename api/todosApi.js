import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:4000",
});

export const getTodos = async () => {
  const response = await todosApi.get("/todos");
  return response.data;
};

export const addTodo = async (newTodos) => {
  return await todosApi.post("/todos", newTodos);
};

export const updateTodo = async ({id,updatedTodo}) => {
  return await todosApi.patch(`/todos/${id}`, updatedTodo);
};

export const deleteTodo = async (id) => {
    return await todosApi.delete(`/todos/${id}`);

}

export const statusTodo = async ({id,statusTodo}) => {
    return await todosApi.patch(`/todos/${id}`,statusTodo);
}

export default todosApi;
