"use client";

import React, { useState } from "react";
import { Steps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { Candidate } from "./pages/candidate";
import { Judge } from "./pages/judge";
import { Ranking } from "./pages/ranking";
import { Category } from "./interfaces/Category";
import { JudgeFormSchema } from "./pages/judge/validations";

interface Configs {
  categories: Category[];
}

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [configs, setConfigs] = useState<Configs>();

  const handleReaderConfigs = (configs: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        const jsonData = JSON.parse(content);
        setConfigs(jsonData);
      } catch (error) {
        console.error("Erro ao analisar o arquivo JSON:", error);
      }
    };

    reader.readAsText(configs);
  };

  const handleNextPage = (values: JudgeFormSchema) => {
    setStep((stepCurrent) => stepCurrent + 1);
    console.log(values);
    handleReaderConfigs(values.configsFile as File);
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
        content: configs && <Candidate categories={configs.categories} />,
      },
    },
    {
      label: "Ranking",
      data: { title: "Ranking dos Candidatos", content: <Ranking /> },
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
