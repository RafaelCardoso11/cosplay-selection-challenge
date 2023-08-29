"use client";
import { Input } from "@/components/Input";
import { FormikProps } from "formik";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { MouseEvent, useRef, useState } from "react";

interface IRating {
  score: number;
}

interface FinalRatingProps {
  formikProps: FormikProps<{}>;
}

function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

function isStringNumber(str: string) {
  return !isNaN(Number(str));
}

export const FinalRatings: React.FC<FinalRatingProps> = ({
  formikProps
}) => {
  const toast = useRef<Toast>(null);
  const [finalRatings, setFinalRatings] = useState<number>(0);

  const handleCalculateNotas = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const hasErrors = await formikProps.validateForm();

    if (isObjectEmpty(hasErrors)) {
      const ratings = Object.values(formikProps.values)
        .filter((rating) => isStringNumber(rating as string))
        .map<IRating>((score) => {
          return { score: Number(score) };
        });

      const finalRatings = ratings.reduce((acc, currentValue) => {
        return currentValue.score + acc;
      }, 0);

      if (finalRatings) {
        toast.current?.show({
          severity: "info",
          summary: "Calculado",
          detail: "Notas Calculadas com sucesso! Nota Final: " + finalRatings,
          life: 3000,
        });
      }

      setFinalRatings(finalRatings);
    }
  };

  return (
    <div className="bg-slate-50 p-4 rounded-xl">
         <Toast ref={toast} />
      <div className="flex justify-end">
        <Button
          className="justify-center my-3 text-sm "
          onClick={handleCalculateNotas}
        >
          Calcular Nota Final
        </Button>
      </div>
      <Input
        id="notaFinal"
        label="Nota Final"
        inputTextProps={{ disabled: true, value: finalRatings.toString() }}
      />
    </div>
  );
};
