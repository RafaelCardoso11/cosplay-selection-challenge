import { useContext } from "react";
import { AvaliationContext } from "./context";
import { IAvaliation } from "./interface";

const AVALIATIONS_KEY = "avaliations";

export const useAvaliation = () => {
  const { avaliation, setAvaliation } = useContext(AvaliationContext);

  const getAvaliations = () => {
    const avaliations = localStorage.getItem(AVALIATIONS_KEY);

    return avaliations ? JSON.parse(avaliations) : [];
  };

  const getLastAvaliation = () => {
    const avaliationsInString = localStorage.getItem(AVALIATIONS_KEY);

    if (avaliationsInString) {
      const avaliations: IAvaliation[] = JSON.parse(avaliationsInString);

      const lastAvaliation = avaliations.at(-1);
      return lastAvaliation as IAvaliation;
    }
  };

  const setAvaliations = (avaliations: IAvaliation[]) => {
    return localStorage.setItem("avaliations", JSON.stringify(avaliations));
  };

  const resetAvaliations = () => {
    return localStorage.removeItem(AVALIATIONS_KEY);
  };

  const setValues = (avaliation: IAvaliation | {}) => {
    if (setAvaliation) {
      setAvaliation((prev: IAvaliation) => ({
        ...prev,
        ...avaliation,
      }));
    }
  };

  return {
    avaliation,
    setValues,
    setAvaliations,
    getAvaliations,
    getLastAvaliation,
    resetAvaliations,
  };
};
