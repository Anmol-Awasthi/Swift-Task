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
    <form onSubmit={add} className="flex align-center justify-center">
      <input
        type="text"
        placeholder="Enter your task here..."
        className="w-[50%] border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-[#1c2541] py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
