import React, { useEffect, useState } from "react";
import { ToDoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem("todos");

      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);

        if (Array.isArray(parsedTodos) && parsedTodos.length > 0) {
          setTodos(parsedTodos);
        }
      }
    } catch (error) {
      console.error("Error getting todos from Local Storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const stringifiedTodos = JSON.stringify(todos);

      localStorage.setItem("todos", stringifiedTodos);
    } catch (error) {
      console.error("Error saving todos to Local Storage:", error);
    }
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? todo : item)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <ToDoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted }}
    >
      <div className="bg-[#001219] min-h-screen py-8 relative">
        <div className="w-full max-w-5xl mx-auto rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Swift Task Manager
          </h1>
          <div className="mb-8">
            <TodoForm />
          </div>
          {todos.length === 0 ? (
            <p className="text-center text-sm md:text-lg text-gray-400 mt-8">
              No tasks found. Start by adding your first task!
            </p>
          ) : (
            <div className="flex flex-wrap gap-y-6 gap-x-4 align-center justify-around">
              {todos.map((todo) => (
                <div key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          )}

          <div className="fixed bottom-0 left-0 w-full bg-transparent text-black text-center py-2 md:text-white md:bg-transparent">
            Made with ❤ by Anmol
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
