import { addTodo, getTodos } from "@/api/todosApi";
import { list } from "postcss";
import React, { useState } from "react";
import { Loader } from "@mantine/core";
import TodoCard from "@/components/TodoCard";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import  {moment} from 'moment'
import { useAddTodoMutation, useTodo } from "@/hooks/useTodos/useTodo";
import { getCurrentDate } from "@/hooks/useTodos/getCurrnetDate";




const home = () => {
  const [newTodos, setTodos] = useState("");
  const {postQuery,useAddTodoMutation} = useTodo();

  const { data: todos, isLoading, error } = postQuery();
  
  const sortedTodos = todos?.sort((a, b) => b.id - a.id) 

 

  const formattedDate = getCurrentDate();
const {mutate:addTodo} = useAddTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({title:newTodos,isFinished:false,date: formattedDate })
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
              required
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
