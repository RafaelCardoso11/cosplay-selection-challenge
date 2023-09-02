import { Dispatch, SetStateAction, createContext } from "react";
import { IAvaliation } from "./interface";
import { initialValues } from "./initialValues";

interface AvaliationContext {
  avaliation: IAvaliation;
  setAvaliation?: Dispatch<SetStateAction<IAvaliation>>;
}
export const AvaliationContext = createContext<AvaliationContext>({
  avaliation: initialValues,
});
