import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {

    const [todo, setTodo] = useState("");

    const {addTodo} = useTodo();

    const add = (e) => {
        e.preventDefault();

        if(!todo) return

        addTodo({
            title: todo,
            completed: false
        });
        setTodo("");
    }

  return (
    <form onSubmit={add} className="flex justify-center items-center p-4 bg-[#001219]">
  <input
    type="text"
    placeholder="Enter your task here..."
    className="w-full max-w-lg border border-none rounded-l-lg px-3 py-2 outline-none duration-150 bg-[#1c2541] text-white placeholder-gray-400 focus:ring-2 focus:ring-white overflow-hidden"
    value={todo}
    onChange={(e) => setTodo(e.target.value)}
  />
  <button
    type="submit"
    className="rounded-r-lg px-4 py-2 bg-green-600 text-white hover:bg-green-700 duration-150 overflow-hidden"
  >
    Add
  </button>
</form>

  );
}

export default TodoForm;
