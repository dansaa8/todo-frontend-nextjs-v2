"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from '../lib/definitions';
import { getAll } from '@/app/lib/tasks-api';

interface TodosContextType {
  todos: Todo[];
  loading: boolean;
  error: Error | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
}

export const TodoListContext = createContext<TodosContextType | undefined>(undefined);

export const useTodoListContext = () => {
  const context = useContext(TodoListContext);
  if (context === undefined) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }
  return context;
};

export const TodoListProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getAll();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <TodoListContext.Provider value={{ todos, loading, error, setTodos, setLoading, setError }}>
      {children}
    </TodoListContext.Provider>
  );
};
