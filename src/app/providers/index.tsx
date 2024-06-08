'use client';

import { TodoListProvider } from "./todo-list-context";
import { SnackbarProvider } from "./snackbar-context";

export function Providers({ children }) {
  return (
    <SnackbarProvider>
      <TodoListProvider>{children}</TodoListProvider>
    </SnackbarProvider>
  );
}