"use client";
import React, { createContext, useContext } from "react";
import { Todo } from "../lib/definitions";

// Create the context
const TodoContext = createContext<Todo | undefined>(undefined);

// Create a custom hook to consume the context
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

// Export the context
export { TodoContext };

// Export the provider
export default function TodoProvider({ children, todo }: { children: React.ReactNode; todo: Todo }) {
  return (
    <TodoContext.Provider value={todo}>
      {children}
    </TodoContext.Provider>
  );
}
