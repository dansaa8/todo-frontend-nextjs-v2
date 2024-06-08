'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';

// Define the type for the context value
interface SnackbarContextType {
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
}

// Create the context with the defined type
const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

// Custom hook to use the Snackbar context
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

// Define props for the SnackbarProvider
interface SnackbarProviderProps {
  children: ReactNode;
}

// SnackbarProvider component
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={hideSnackbar}
        message={snackbarMessage}
      />
    </SnackbarContext.Provider>
  );
};
