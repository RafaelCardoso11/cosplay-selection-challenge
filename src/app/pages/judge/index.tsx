"use client";
import { Input } from "@/components/Input";
import { Button } from "primereact/button";
import { Formik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";
import { JudgeFormSchema, judgeFormSchema, initialValues } from "./validations";
import { File } from "@/components/file";

interface JudgeProps {
  handleNextPage: (values: JudgeFormSchema) => void;
}

export const Judge: React.FC<JudgeProps> = ({ handleNextPage }) => {
  return (
    <Formik<JudgeFormSchema>
      initialValues={initialValues}
      onSubmit={handleNextPage}
      validationSchema={toFormikValidationSchema(judgeFormSchema)}
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values: any) => {
        const errors: any = {};

        if (
          !values.configsFile.name ||
          !values.configsFile.type ||
          !values.configsFile.size
        ) {
          errors.configsFile = "Configurações são obrigatórias.";
        }

        return errors;
      }}
    >
      {(props) => (
        <div>
          <div className="mb-10">
            <p className="text-sm text-gray-700">
              ATENÇÃO JURADOS
              <br />
              ANTES DO PARTICIPANTE SUBIR AO PALCO VOCÊ DEVE
              <br />
              - MARCAR SEU NOME
              <br />
              - ESCREVER O NOME DO PARTICIPANTE
              <br />
              - ESCREVER O NOME DO PERSONAGEM
              <br />
              <br />
              TODOS OS PARTICIPANTES TERÃO 30 SEGUNDOS PARA DESFILAR
              <br />
              AVALIE SOMENTE APÓS O CANDIDATO DEIXAR O PALCO
              <br />E SÓ ENVIE O FORMULÁRIO APÓS O OK DA AMANDA.
            </p>
          </div>
          <div className="space-y-5 mb-6">
            <Input id="judge" label="Nome do Jurado" propsFormik={props} />
          </div>
          <div>
            <File
              id="configsFile"
              label="Configurações"
              accept=".json"
              propsFormik={props}
            />
          </div>
          <Button
            className="w-full justify-center mt-10"
            onClick={() => {
              props.submitForm();
            }}
          >
            Confirmar Configurações
          </Button>
        </div>
      )}
    </Formik>
  );
};
