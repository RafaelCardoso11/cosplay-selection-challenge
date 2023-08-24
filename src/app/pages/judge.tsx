"use client";
import { Input } from "@/components/Input";
import { Button } from "primereact/button";
import { Formik, Form, Field } from "formik";

interface JudgeProps {
  handleNextPage: (values: { judge: string }) => void;
}

import z, { TypeOf, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const contactFormSchema = object({
  judge: string({
    required_error: "O nome do Jurado é obrigatório!",
  }),
  configs: string({
    required_error: "Configurações são obrigatórias",
  }),
});

type ContactFormInputs = TypeOf<typeof contactFormSchema>;
export const Judge: React.FC<JudgeProps> = ({ handleNextPage }) => {
  return (
    <Formik<ContactFormInputs>
      initialValues={{
        judge: "",
        configs: "",
      }}
      onSubmit={(values) => {
        handleNextPage(values);
      }}
      validationSchema={toFormikValidationSchema(contactFormSchema)}
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
            <Input
              id="configs"
              label="Configurações"
              inputTextProps={{ type: "file", accept: ".json" }}
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
