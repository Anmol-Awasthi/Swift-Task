import {createContext, useContext} from 'react'

export const ToDoContext = createContext({
    todos: [
        {
            id: 1,
            title: 'Take a shower',
            completed: false
        },
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {}, 
    toggleCompleted: (id) => {}
})

export const useTodo = () => useContext(ToDoContext)

export const ToDoProvider = ToDoContext.Provider