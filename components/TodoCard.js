import React, { useState } from "react";
import { Card, Button } from "@mantine/core";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodo, getTodos, statusTodo, updateTodo } from "@/api/todosApi";
import { Input } from "@mantine/core";


const TodoCard = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
  const queryClient = useQueryClient();
  const {
    data: todos,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos", "get"],
    queryFn: getTodos,
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const statusTodoMutation = useMutation(statusTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const getCurrentDate = () =>{
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
  
    return `${day}, ${month}, ${year} | ${hours}:${minutes}:${seconds}`;
  }

  const formattedDate = getCurrentDate();

  const handleToggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleUpdateTodo = () => {
    const updatedTodo = {
      ...todo,
      title: newTodoTitle,
      isFinished: false,
      date : formattedDate
    };

    updateTodoMutation.mutate({ id: todo.id, updatedTodo });

    handleToggleEdit();
  };
  const handleStatusTodo = () => {
    const statusTodo = { ...todo, isFinished: !todo.isFinished };

    statusTodoMutation.mutate({ id: todo.id, statusTodo });
  };
  return (
    <div>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className=" w-[400px] h-[130px]"
      >
        <div className=" flex align-middle justify-between">
          {isEditing ? (
            <Input
              radius="md"
              size="lg"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
          ) : (
            <p className="font-semibold">{todo.title}</p>
          )}
          {isEditing && (
            <Button
              onClick={handleUpdateTodo}
              variant="outline"
              radius="md"
              size="sm"
              type="submit"
              color="green"
            >
              Update
            </Button>
          )}
          <Button
            onClick={handleStatusTodo}
            variant="outline"
            color="dark"
            size="xs"
          >
            {todo.isFinished ? (
              <p className=" text-green-600">Finished</p>
            ) : (
              <p className=" text-red-600">Not Finished</p>
            )}
          </Button>
        </div>
        <hr className=" mt-5 mb-2 " />
        <div className=" flex justify-between ">
          <div>
            <button
              onClick={() => deleteTodoMutation.mutate(todo.id)}
              className=" text-2xl text-red-600 mr-3"
            >
              <AiOutlineDelete />
            </button>
            <button
              className=" text-2xl text-green-600"
              onClick={handleToggleEdit}
            >
              <BiSolidPencil />
            </button>
          </div>
          <div>
            <p className=" font-bold">{todo.date}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TodoCard;
