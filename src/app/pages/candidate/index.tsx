"use client";
import { Input } from "@/components/Input";
import { Category } from "../../interfaces/Category";
import { Button } from "primereact/button";
import { Formik, useFormik } from "formik";
import {
  CandidateFormSchema,
  candidateFormSchema,
  initialValues,
} from "./validations";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRef, useState } from "react";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { Questions } from "./components/questions/questions";
import { useAvaliation } from "@/app/contexts/avaliation/useAvaliation";

interface CandidateProps {
  categories: Category[];
  handleNextStep: () => void;
}
export const Candidate: React.FC<CandidateProps> = ({
  categories,
  handleNextStep,
}) => {
  const toast = useRef<Toast>(null);
  const containerConfirmAvaliationRef = useRef<HTMLDivElement>(null);
  const [resetAvaliation, setResetAvaliation] = useState(false);

  const { setValues, getLastAvaliation } = useAvaliation();

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(candidateFormSchema),
    onSubmit: (data, props) => {
      setValues({ candidate: data });
      // handleNextStep()
    },
    validate(values) {
      let errors: any = {};
      if (values.totalRating === initialValues.totalRating) {
        errors.totalRating = "A Avaliação não foi preenchida.";
        toast.current?.show({
          severity: "error",
          summary: "Info",
          detail: errors.totalRating,
        });
      }
      return errors;
    },
  });

  const lastAvaliation = getLastAvaliation();

  return (
    <div>
      {lastAvaliation?.candidate.name && (
        <div className="mb-10 bg-slate-100 p-5 rounded-sm">
          <h2 className="text-sm font-semibold">
            Última avaliação:
            <span className="text-sm font-normal">
              {lastAvaliation.candidate.name} {"29/08/23 : 16:35"}
            </span>
          </h2>
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="space-y-5 mb-6">
            <Input id="name" label="Nome do Candidato" propsFormik={formik} />
            <Input id="character" label="Personagem" propsFormik={formik} />
          </div>
          <span className="text-2xl font-semibold mb-1">
            Avaliação
            {formik.errors.totalRating && (
              <small className="p-error text-sm">*</small>
            )}
          </span>
          <p className="mb-7 text-sm break-words">
            Notas objetivas e observações personalizadas.
          </p>
          <Questions
            categories={categories}
            formikProps={formik}
            resetAvaliation={resetAvaliation}
          />

          <Toast ref={toast} />
          <ConfirmPopup />

          <div
            className="flex gap-2 justify-center"
            ref={containerConfirmAvaliationRef}
          >
            <Button
              className="w-full justify-center mt-10 bg-blue-700"
              type="submit"
            >
              Confirmar Avaliação
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
