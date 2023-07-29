import { addTodo, getTodos } from "@/api/todosApi";
import { list } from "postcss";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Loader } from "@mantine/core";
import TodoCard from "@/components/TodoCard";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import  {moment} from 'moment'




const home = () => {
  const [newTodos, setTodos] = useState("");
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
  
  const sortedTodos = todos?.sort((a, b) => b.id - a.id)
  const addTodoMutation = useMutation(addTodo,{
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
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



  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({title:newTodos,isFinished:false,date: formattedDate })
    setTodos("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  } else if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <>
    
      <div className=" max-w-md mx-auto my-5">
        <form onSubmit={handleSubmit}>
          <div className=" flex">
            <Input
              placeholder="Add Todo"
              radius="md"
              size="lg"
              value={newTodos}
              onChange={(e) => setTodos(e.target.value)}
            />
            <Button variant="outline" radius="md" size="lg" type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
      <div className=" my-3 flex justify-center  align-middle">
        <form action=""></form>
      </div>
      <div className=" flex flex-wrap gap-6 justify-center ">
        {sortedTodos?.map((todo) => {
          return (
            <div key={todo.id} >
              <TodoCard todo={todo} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default home;
