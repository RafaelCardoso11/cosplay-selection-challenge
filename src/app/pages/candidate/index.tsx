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
import { useRef } from "react";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { Questions } from "./components/questions";

interface CandidateProps {
  categories: Category[];
  handleNextPage: () => void;
}
export const Candidate: React.FC<CandidateProps> = ({
  categories,
  handleNextPage,
}) => {
  const toast = useRef<Toast>(null);

  const accept = () => {
    toast.current?.show({
      severity: "info",
      summary: "Continuar",
      detail: "Continuar Candidaturas",
      life: 3000,
    });
    handleNextPage();
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Finalizar",
      detail: "Finalizar Candidaturas",
      life: 3000,
    });
  };

  const confirm1 = async (
    event: any,
    formik: FormikProps<CandidateFormSchema>
  ) => {
    const hasErrors = await formik.validateForm();

    if (!hasErrors) {
      confirmPopup({
        target: event.currentTarget,
        message: "Você deseja continuar a candidatura?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Continuar Candidaturas",
        rejectLabel: "Finalizar Candidaturas",
        accept,
        reject,
      });
    }
  };

  return (
    <div>
      <div className="mb-10 bg-slate-100 p-5 rounded-sm" >
        <h2 className="text-sm font-semibold">
          Última avaliação:
          <span className="text-sm font-normal"> {"Rafael, "} {"29/08/23 : 16:35"}</span>
        </h2>

      </div>
      <Formik<CandidateFormSchema>
        {...{
          initialValues,
          validateOnBlur: false,
          validateOnChange: false,

          validationSchema: toFormikValidationSchema(candidateFormSchema),
          onSubmit: (values) => {
            alert(JSON.stringify(values));
          },
          validate(values) {
            if (!values.ratings.length) {
              toast.current?.show({
                severity: "error",
                summary: "Info",
                detail: "A Avaliação não foi preenchida.",
              });
            }
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
              <h2 className="text-2xl font-semibold mb-1">Avaliação</h2>
              <p className="mb-7 text-sm break-words">
                Notas objetivas e observações personalizadas.
              </p>
              <FieldArray
                name="ratings"
                render={(ratings: FieldArrayRenderProps) => (
                  <Questions categories={categories} ratings={ratings} />
                )}
              />

              <Toast ref={toast} />
              <ConfirmPopup />
              <div className=" flex gap-2 justify-center">
                <Button
                  className="w-full justify-center mt-10 bg-blue-700"
                  type="reset"
                  onClick={(e) => confirm1(e, formik)}
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
