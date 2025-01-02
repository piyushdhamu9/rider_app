import React, { useState, useEffect, createContext, useContext, useMemo } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  // Memoize value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  }), [captain, isLoading, error]);

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

// Custom hook for cleaner usage
export const useCaptainContext = () => {
  const context = useContext(CaptainDataContext);
  if (!context) {
    throw new Error("useCaptainContext must be used within a CaptainContext");
  }
  return context;
};

export default CaptainContext;
