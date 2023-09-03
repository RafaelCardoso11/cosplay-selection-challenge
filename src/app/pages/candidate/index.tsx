"use client";
import { Input } from "@/components/Input";
import { Category } from "../../interfaces/Category";
import { Button } from "primereact/button";
import { Formik, useFormik } from "formik";
import { candidateFormSchema, initialValues } from "./validations";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Questions } from "./components/questions/questions";
import { useAvaliation } from "@/app/contexts/avaliation/useAvaliation";
import { Modal } from "@/components/modal";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

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
  const [openModalConfirmAvaliation, setOpenModalConfirmAvaliation] =
    useState(false);

  const { setValues, getLastAvaliation, avaliation, setAvaliations } =
    useAvaliation();

  const lastAvaliation = getLastAvaliation();

  const handleCloseModalConfirmAvaliation = () => {
    setOpenModalConfirmAvaliation(false);
  };

  const handleOpenModalConfirmAvaliation = () => {
    setOpenModalConfirmAvaliation(true);
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(candidateFormSchema),
    onSubmit: handleOpenModalConfirmAvaliation,
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

  const handleSetNewAvaliation = () => {
    setResetAvaliation(true);

    const avaliation = formik.values;

    setValues({ candidate: avaliation }, true);
  };

  const handleNewAvaliation = () => {
    handleSetNewAvaliation();
    toast.current?.show({
      severity: "success",
      summary: "Candidatura Cadastrada!",
      detail: "Você está pronto para uma nova candidatura.",
    });

    handleCloseModalConfirmAvaliation();
    scrollToTop();
  };

  const handleEndAvalitions = () => {
    handleSetNewAvaliation();

    handleNextStep();
  };

  const avaliationCurrentOrLast = avaliation?.candidate.name
    ? avaliation
    : lastAvaliation;

  return (
    <div>
      {avaliationCurrentOrLast && (
        <div className="mb-10 bg-slate-100 p-5 rounded-sm">
          <h2 className="text-sm font-semibold">
            Última avaliação:
            <span className="text-sm font-normal">
              {` ${avaliationCurrentOrLast.candidate.character} - ${avaliationCurrentOrLast.candidate.name}`}
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
            setResetAvaliation={setResetAvaliation}
          />

          <Toast ref={toast} />
          <Modal
            title="Confirmar Avaliação"
            description="Sua avaliação somente será confirmada ao clicar em 'Nova avaliação' ou 'Finalizar Avaliações'"
            setVisible={setOpenModalConfirmAvaliation}
            className="grid grid-cols-2 gap-4 justify-center"
            visible={openModalConfirmAvaliation}
          >
            <Button
              severity="info"
              className="justify-center"
              onClick={handleCloseModalConfirmAvaliation}
            >
              Voltar
            </Button>
            <Button
              severity="warning"
              className="justify-center"
              onClick={handleNewAvaliation}
            >
              Nova avaliação
            </Button>
            <Button
              severity="danger"
              className="col-span-2 w-full justify-center"
              onClick={handleEndAvalitions}
            >
              Finalizar Avaliações
            </Button>
          </Modal>

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
