"use client";

import React, { useState } from "react";
import { Steps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { Candidate } from "./pages/candidate";
import { Judge } from "./pages/judge";

const categories = [
  {
    category: "Mobilidade/Desenvoltura",
    hasObservation: true,
    description: "Avaliação da mobilidade e desenvoltura do personagem.",
    required: true,
    maxScore: 10,
    allowDecimal: true,
    scoreFieldName: "Nota",
    observationFieldName: "Observação",
  },
  {
    category: "Fidelidade",
    hasObservation: true,
    description:
      "Avaliação da fidelidade em relação à referência original ou ao conceito proposto.",
    required: true,
    maxScore: 10,
    allowDecimal: true,
    scoreFieldName: "Nota",
    observationFieldName: "Observação",
  },
  {
    category: "Acabamento",
    hasObservation: true,
    description: "Avaliação dos detalhes e acabamento geral da caracterização.",
    required: true,
    maxScore: 10,
    allowDecimal: true,
    scoreFieldName: "Nota",
    observationFieldName: "Observação",
  },
  {
    category: "Acessórios (armas/ bolsas/ peruca/ maquiagem)",
    hasObservation: true,
    description:
      "Avaliação dos acessórios, como armas, bolsas, perucas e maquiagem.",
    required: true,
    maxScore: 10,
    allowDecimal: true,
    scoreFieldName: "Nota",
    observationFieldName: "Observação",
  },
  {
    category: "Criatividade / Interpretação",
    hasObservation: true,
    description:
      "Avaliação da criatividade e interpretação única do personagem.",
    required: true,
    maxScore: 10,
    allowDecimal: true,
    scoreFieldName: "Nota",
    observationFieldName: "Observação",
  },
  {
    category: "Imagem referência",
    hasObservation: false,
    description: "Imagens usadas como referência, sem observações associadas.",
    required: true,
    maxScore: 10,
    allowDecimal: true,
    scoreFieldName: "Nota",
    observationFieldName: "Observação",
  },
];

export default function Home() {
  const [step, setStep] = useState<number>(0);

  const handleNextPage = () => {
    setStep((stepCurrent) => stepCurrent + 1);
  };
  const items: MenuItem[] = [
    {
      label: "Jurado",
      data: {
        title: "Ficha do Jurado",
        content: <Judge handleNextPage={handleNextPage} />,
      },
    },
    {
      label: "Candidato",
      data: {
        title: "Ficha do Candidato",
        content: categories.length && <Candidate categories={categories} />,
      },
    },
    {
      label: "Ranking",
      data: { title: "Ranking dos Candidatos", content: <></> },
    },
  ];

  return (
    <div>
      <header className="flex items-center justify-center h-40 bg-blue-600  text-white mb-5 p-5">
        <h1 className="text-2xl font-semibold ">
          Art Cosplay - Sistema Beta v1.0
        </h1>
      </header>
      <main className=" flex items-center justify-center">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-md">
          <Steps
            model={items}
            activeIndex={step}
            onSelect={(e) => setStep(e.index)}
            readOnly={false}
          />
          <div className="my-10">
            <h2 className="text-2xl font-semibold mb-4">
              {items[step].data.title}
            </h2>
          </div>

          {items[step].data.content}
        </div>
      </main>
    </div>
  );
}
