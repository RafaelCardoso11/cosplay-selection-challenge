"use client";
import { Input } from "@/components/Input";
import { Category } from "../../interfaces/Category";
import { Button } from "primereact/button";
import { FieldArray, FieldArrayRenderProps, Formik, FormikProps } from "formik";
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

interface CandidateProps {
  categories: Category[];
  handleNextPage: () => void;
}
export const Candidate: React.FC<CandidateProps> = ({
  categories,
  handleNextPage,
}) => {
  const toast = useRef<Toast>(null);
  const containerConfirmAvaliationRef = useRef<HTMLDivElement>(null);
  const [resetAvaliation, setResetAvaliation] = useState(false);

  const accept = () => {
    toast.current?.show({
      severity: "info",
      summary: "Continuar",
      detail: "Continuar Candidaturas",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Finalizar",
      detail: "Finalizar Candidaturas",
      life: 3000,
    });
    handleNextPage();
  };

  return (
    <div>
      <div className="mb-10 bg-slate-100 p-5 rounded-sm">
        <h2 className="text-sm font-semibold">
          Última avaliação:
          <span className="text-sm font-normal">
            {" "}
            {"Rafael, "} {"29/08/23 : 16:35"}
          </span>
        </h2>
      </div>
      <Formik<CandidateFormSchema>
        {...{
          initialValues,
          validateOnBlur: false,
          validateOnChange: false,
          validationSchema: toFormikValidationSchema(candidateFormSchema),
          onSubmit: (_, props) => {
            confirmPopup({
              target: containerConfirmAvaliationRef.current
                ? containerConfirmAvaliationRef.current
                : undefined,
              message: "Você deseja continuar a candidatura?",
              icon: "pi pi-exclamation-triangle",
              acceptLabel: "Continuar Candidaturas",
              rejectLabel: "Ver ranking",
              accept,
              onHide: () => {
                setResetAvaliation(true);
                props.resetForm();
              },
              onShow() {
                setResetAvaliation(false);
              },
              reject,
            });
          },
          validate(values) {
            let errors: any = {}
            if (values.totalRating === initialValues.totalRating) {
              errors.totalRating = "A Avaliação não foi preenchida."
              toast.current?.show({
                severity: "error",
                summary: "Info",
                detail: errors.totalRating,
              });
            }
            return errors
          },
        }}
      >
        {(formik) => (
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
        )}
      </Formik>
    </div>
  );
};
