"use client";

import React, { useMemo, useState } from "react";
import { Steps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { Candidate } from "./pages/candidate";
import { Judge } from "./pages/judge";
import { Ranking } from "./pages/ranking";
import { Category } from "./interfaces/Category";

export interface Configs {
  categories: Category[];
}

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [configs, setConfigs] = useState<Configs>();

  const handleNextStep = () => {
    setStep((stepCurrent) => stepCurrent + 1);
  };

  const handleBackStep = () => {
    setStep((stepCurrent) => stepCurrent - 1);
  };

  const items: MenuItem[] = [
    {
      label: "Jurado",
      disabled: true,
      data: {
        title: "Ficha do Jurado",
        content: (
          <Judge handleNextStep={handleNextStep} setConfigs={setConfigs} />
        ),
      },
    },
    {
      label: "Candidato",
      disabled: true,
      data: {
        title: "Ficha do Candidato",

        content: configs && (
          <Candidate
            categories={configs.categories}
            handleNextStep={handleNextStep}
          />
        ),
      },
    },
    {
      label: "Ranking",
      disabled: !configs,
      data: {
        title: "Ranking dos Candidatos",
        content: <Ranking handleBackStep={handleBackStep} />,
      },
    },
  ];

  return (
    <div>
      <header className="flex items-center justify-center h-40 bg-blue-600  text-white mb-5 p-5">
        <h1 className="text-2xl font-semibold ">
          Art Cosplay - Sistema Avaliações Beta v1.0
        </h1>
      </header>
      <main className=" flex items-center justify-center">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-md">
          <Steps
            model={items}
            activeIndex={step}
            readOnly={false}
            onSelect={(e) => setStep(e.index)}
          />

          <div className="my-10">
            <h2 className="text-2xl font-semibold mb-4">
              {items[step].data.title}
            </h2>
          </div>

          {items[step].data.content}
        </div>
      </main>
      <footer className="h-20 flex items-center justify-center  text-center">
        <span>
          Em desenvolvimento por{" "}
          <a
            href="https://www.linkedin.com/in/rafaelcardoso11/"
            target="_blank"
          >
            @RafaelCardoso11 (Linkedin)
          </a>{" "}
          💙
        </span>
      </footer>
    </div>
  );
}
