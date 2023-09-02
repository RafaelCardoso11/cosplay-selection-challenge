import { useContext } from "react";
import { AvaliationContext } from "./context";
import { IAvaliation } from "./interface";

export const useAvaliation = () => {
  const { avaliation, setAvaliation } = useContext(AvaliationContext);

  const setValues = (avaliation: IAvaliation | {}) => {
    if (setAvaliation) {
      console.log(avaliation ,  "avaliationn")
      setAvaliation((prev: IAvaliation) => ({
        ...prev,
        ...avaliation,
      }));
    }
  };

  return {
    avaliation,
    setValues,
  };
};
