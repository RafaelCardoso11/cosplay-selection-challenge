"use client";
import { Input } from "@/components/Input";
import { Accordion, AccordionTab } from "primereact/accordion";
import { generateArrayFromIndex } from "../helpers/generateArrayFromIndex";
import { Category } from "../interfaces/Category";

import { Separator } from "@/components/separator";
import { Button } from "primereact/button";
import { FinalRatings } from "../../components/finalRatings";

interface CandidateProps {
  categories: Category[];
}
export const Candidate: React.FC<CandidateProps> = ({ categories }) => {
  return (
    <div>
      <div className="space-y-5 mb-6">
        <Input id="candidato" label="Nome do Candidato" />
        <Input id="character" label="Personagem" />
      </div>
      <h2 className="text-2xl font-semibold mb-1">Avaliação</h2>
      <p className="mb-7 text-sm break-words">
        Notas objetivas e observações personalizadas.
      </p>

      <Accordion
        multiple
        activeIndex={generateArrayFromIndex(categories.length)}
        className="space-y-5"
      >
        {categories.map(
          (
            {
              category,
              hasObservation,
              description,
              observationFieldName,
              scoreFieldName,
              maxScore,
            },
            index
          ) => (
            <AccordionTab
              header={
                <>
                  {index + 1}. {category}
                </>
              }
              key={index}
            >
              <div>
                <h2 className="text-1xl w-full  mb-4">{description}</h2>
                <div className="space-y-5">
                  <Input
                    id={category.trim() + "_nota"}
                    inputTextProps={{
                      keyfilter: "pnum",
                    }}
                    label={scoreFieldName}
                  />
                  {hasObservation && (
                    <Input
                      id={category.trim() + "_obs"}
                      label={observationFieldName}
                    />
                  )}
                </div>
       
              </div>
            </AccordionTab>
            
          )
        )}
      </Accordion>

      <div className="mt-10">
        <FinalRatings ratings={[{ score: 2 }, { score: 3 }]} />
      </div>

      <Button className="w-full justify-center mt-10 bg-blue-700">
        Confirmar Avaliação
      </Button>
    </div>
  );
};
