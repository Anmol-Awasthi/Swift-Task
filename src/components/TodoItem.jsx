import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {

    const { updateTodo, deleteTodo, toggleCompleted } = useTodo();
    const [todoMsg, setTodoMsg] = useState(todo.title);
    const [isTodoEditable, setIsTodoEditable] = useState(false);

    const editTodo = () => {
        updateTodo(todo.id, {...todo, title: todoMsg });
        setIsTodoEditable(false);
    }

    const toggleEditMode = () => {
        toggleCompleted(todo.id);
    }

  return (
    <div
      className={`flex-col border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <div className="flex justify-between items-center gap-4 ">
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleEditMode}
      />
      {todo.completed? (
        <p>Already done ..!!</p>
      ) : (
        <p >Do it ..!!</p>
      )}
      </div>
      <input
        type="text"
        className={`border outline-none w-full break-words bg-transparent rounded-lg mb-4 text-center mt-3 ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <div className="flex justify-around items-center gap-4">
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
      </div>
    </div>
  );
}

export default TodoItem;
