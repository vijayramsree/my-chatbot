// Shared Context Component: Provides a centralized context for the entire application.
// Default Values: Includes default settings such as Model: gpt-4o and Temperature: 0.5.
// Also global context contains Loading and User State

"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface LoadingContext {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    temperatureValue: number;
    setTemperatureValue: (value: number) => void;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
    user: string | null;
    setUser: (user: string | null) => void;
}

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (_isLoading: boolean) => {},
  temperatureValue: 0.5,
  setTemperatureValue: (_value: number) => {},
  selectedModel: "gpt-4o",
  setSelectedModel: (_model: string) => {},
  user: null,
  setUser: (_user: string | null) => {}
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [temperatureValue, setTemperatureValue] = useState(0.5);
    const [selectedModel, setSelectedModel] = useState("gpt-4o");
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(savedUser);
        }
      }, []);

      useEffect(() => {
        if (user) {
          localStorage.setItem('user', user);

        } else {
          localStorage.removeItem('user');
        }
      }, [user]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        temperatureValue,
        setTemperatureValue,
        selectedModel,
        setSelectedModel,
        user,
        setUser,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};