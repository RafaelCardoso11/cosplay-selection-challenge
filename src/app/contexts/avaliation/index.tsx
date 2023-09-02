"use client";

import { ReactNode, useEffect, useState } from "react";
import { AvaliationContext } from "./context";
import { IAvaliation } from "./interface";
import { initialValues } from "./initialValues";

interface AvaliationProviderProps {
  children: ReactNode;
}

export const AvaliationProvider: React.FC<AvaliationProviderProps> = ({
  children,
}) => {
  const [avaliation, setAvaliation] = useState<IAvaliation>(initialValues);


  return (
    <AvaliationContext.Provider
      value={{
        avaliation,
        setAvaliation,
      }}
    >
      {children}
    </AvaliationContext.Provider>
  );
};
