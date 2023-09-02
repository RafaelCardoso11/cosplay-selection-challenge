import { useCallback, useContext } from "react";
import { AvaliationContext } from "./context";
import { IAvaliation } from "./interface";
import { initialValues } from "./initialValues";

const AVALIATIONS_KEY = "avaliations";

export const useAvaliation = () => {
  const { avaliation, setAvaliation } = useContext(AvaliationContext);

  const getAvaliations = () => {
    const avaliations = localStorage.getItem(AVALIATIONS_KEY);

    return avaliations ? (JSON.parse(avaliations) as IAvaliation[]) : [];
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
    localStorage.removeItem(AVALIATIONS_KEY);
    if (setAvaliation) {
      setAvaliation(initialValues);
    }
  };

  const deleteAvaliation = (index: number) => {
    const avaliations = getAvaliations();

    const newAvaliations = avaliations.splice(0, index);

    setAvaliations(newAvaliations);
  };

  const setValues = (
    avaliation: IAvaliation | any,
    setAvaliationInAvaliations?: boolean
  ) => {
    if (setAvaliation) {
      setAvaliation((prev: IAvaliation) => ({ ...prev, ...avaliation }));

      if (setAvaliationInAvaliations && avaliation) {
        const avaliations = getAvaliations();

        setAvaliations([...avaliations, avaliation]);
      }
    }
  };

  return {
    avaliation,
    setValues,
    setAvaliations,
    getAvaliations,
    getLastAvaliation,
    deleteAvaliation,
    resetAvaliations,
  };
};
