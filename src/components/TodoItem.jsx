import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleCompleted } = useTodo();
  const [todoMsg, setTodoMsg] = useState(todo.title);
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, title: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleEditMode = () => {
    toggleCompleted(todo.id);
  };

  return (
    <div
      className={`flex flex-col border border-gray-300 rounded-lg px-4 py-3 gap-3 shadow-md transition duration-300 text-gray-800 ${
        todo.completed ? "bg-green-100" : "bg-purple-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <input
          type="checkbox"
          className="cursor-pointer form-checkbox h-5 w-5 text-purple-600"
          checked={todo.completed}
          onChange={toggleEditMode}
        />
        {todo.completed ? (
          <p className="text-sm font-semibold text-green-700">Already done!</p>
        ) : (
          <p className="text-sm font-semibold text-purple-700">Do it!</p>
        )}
      </div>
      <input
        type="text"
        className={`border w-full break-words bg-transparent rounded-lg mb-2 text-center text-lg font-medium ${
          isTodoEditable ? "border-gray-400 px-2 py-1" : "border-transparent px-2 py-1"
        } ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsTodoEditable(false);
            updateTodo(todo.id, { ...todo, title: todoMsg });
          }
        }}
      />
      <div className="flex justify-around items-center gap-2">
        <button
          className="inline-flex w-10 h-10 rounded-full text-sm border border-gray-300 justify-center items-center bg-gray-100 hover:bg-gray-200 transition shrink-0 disabled:opacity-50"
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
        <button
          className="inline-flex w-10 h-10 rounded-full text-sm border border-gray-300 justify-center items-center bg-gray-100 hover:bg-gray-200 transition shrink-0"
          onClick={() => setIsDeletePopupVisible(true)}
        >
          ❌
        </button>
      </div>

      {isDeletePopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-auto">
            <h2 className="text-xl font-bold text-red-600 mb-2">Wait a Minute!</h2>
            <p className="text-gray-700">Are you sure you want to remove this task?</p>
            <div className="flex justify-around items-center gap-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => {
                  deleteTodo(todo.id);
                  setIsDeletePopupVisible(false);
                }}
              >
                Yes, Delete it!
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setIsDeletePopupVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
