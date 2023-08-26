"use client";
import { Input } from "@/components/Input";
import { Accordion, AccordionTab } from "primereact/accordion";
import { generateArrayFromIndex } from "../../helpers/generateArrayFromIndex";
import { Category } from "../../interfaces/Category";
import { Button } from "primereact/button";
import { FinalRatings } from "../../../components/finalRatings";
import { useFormik } from "formik";
import {
  CandidateFormSchema,
  candidateFormSchema,
  initialValues,
} from "./validations";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useEffect, useState } from "react";

interface CandidateProps {
  categories: Category[];
}
export const Candidate: React.FC<CandidateProps> = ({ categories }) => {
  const [ratings, setRatings] = useState<{ score: number }[]>([]);
  const formik = useFormik<CandidateFormSchema>({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(candidateFormSchema),
    onSubmit: (values: any) => {
      setRatings([]);
      categories.forEach(({ scoreFieldName, keyfilter }, index) => {
        if (keyfilter === "pnum") {
          setRatings((prev) => [
            ...prev,
            { score: Number(values[scoreFieldName.toLowerCase() + index]) },
          ]);
        }
      });
    },
    validate: (values: any) => {
      let errors: any = {};
      categories.forEach(
        ({ category, scoreFieldName, required, maxScore }, index) => {
          if (required && values[scoreFieldName.toLowerCase() + index] === "") {
            errors[
              scoreFieldName.toLowerCase() + index
            ] = `A avaliação da categoria "${category}" é obrigatória`;
          }
          if (
            maxScore &&
            values[scoreFieldName.toLowerCase() + index] > maxScore
          ) {
            errors[
              scoreFieldName.toLowerCase() + index
            ] = `A avaliação deve ser somente até ${maxScore}`;
          }
        }
      );
      return errors;
    },
  });
  useEffect(() => {
    categories.forEach(({ scoreFieldName }, index) => {
      formik.setFieldValue(scoreFieldName.toLowerCase() + index, "");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className="space-y-5 mb-6">
          <Input
            id="candidate"
            label="Nome do Candidato"
            propsFormik={formik}
          />
          <Input id="character" label="Personagem" propsFormik={formik} />
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
                keyfilter,
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
                      id={scoreFieldName.toLowerCase() + index}
                      inputTextProps={{
                        keyfilter,
                        tooltip: maxScore?.toString(),
                      }}
                      propsFormik={formik}
                      label={scoreFieldName}
                    />
                    {hasObservation && (
                      <Input
                        id={category + "_obs"}
                        propsFormik={formik}
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
          <FinalRatings ratings={ratings} />
        </div>

        <Button
          className="w-full justify-center mt-10 bg-blue-700"
          type="reset"
        >
          Confirmar Avaliação
        </Button>
      </div>
    </form>
  );
};
