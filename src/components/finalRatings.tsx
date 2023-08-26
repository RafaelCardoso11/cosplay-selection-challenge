"use client";
import { Input } from "@/components/Input";
import { Button } from "primereact/button";
import { useState } from "react";

interface IRating {
  score: number;
}

interface FinalRatingProps {
  ratings: IRating[];
}

export const FinalRatings: React.FC<FinalRatingProps> = ({ ratings }) => {
  const [finalRatings, setFinalRatings] = useState<number>(0);

  const handleCalculateNotas = () => {
    const finalRatings = ratings.reduce((acc, currentValue) => {
      return currentValue.score + acc;
    }, 0);

    setFinalRatings(finalRatings);
  };

  return (
    <div className="bg-slate-50 p-4 rounded-xl">
      <div className="flex justify-end">
        <Button
          className="justify-center my-3 text-sm bg-blue-700"
          type="submit"
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
