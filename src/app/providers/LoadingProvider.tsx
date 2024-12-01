"use client";

import { createContext, useContext, useState } from "react";

interface LoadingContext {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    temperatureValue: number;
    setTemperatureValue: (value: number) => void;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
}

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {},
  temperatureValue: 0.5,
  setTemperatureValue: (value: number) => {},
  selectedModel: "gpt-4o",
  setSelectedModel: (model: string) => {}
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [temperatureValue, setTemperatureValue] = useState(0.5);
    const [selectedModel, setSelectedModel] = useState("gpt-4o");

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        temperatureValue,
        setTemperatureValue,
        selectedModel,
        setSelectedModel,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};