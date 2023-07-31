import React, { useState } from "react";
import { Card, Button } from "@mantine/core";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { Input } from "@mantine/core";
import { getCurrentDate } from "@/hooks/useTodos/getCurrnetDate";
import { useTodo } from "@/hooks/useTodos/useTodo";

const TodoCard = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
  const {
    postQuery,
    useUpdateToDoMutation,
    useDeleteToDoMutation,
    useStatusToDoMutation,
  } = useTodo();
  const { data: todos, isLoading } = postQuery();
  const { mutate: updateTodo } = useUpdateToDoMutation();
  const { mutate: deleteTodo } = useDeleteToDoMutation();
  const { mutate: status } = useStatusToDoMutation();

  const formattedDate = getCurrentDate();

  const handleToggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleUpdateTodo = () => {
    const updatedTodo = {
      ...todo,
      title: newTodoTitle,
      isFinished: false,
      date: formattedDate,
    };

    updateTodo({ id: todo.id, updatedTodo });

    handleToggleEdit();
  };
  const handleStatusTodo = () => {
    const statusTodo = { ...todo, isFinished: !todo.isFinished };

    status({ id: todo.id, statusTodo });
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
              onClick={() => deleteTodo(todo.id)}
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
