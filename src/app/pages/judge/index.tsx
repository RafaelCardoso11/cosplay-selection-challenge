"use client";
import { Input } from "@/components/Input";
import { Button } from "primereact/button";
import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";
import { JudgeFormSchema, judgeFormSchema, initialValues } from "./validations";
import { useEffect, useCallback, useRef } from "react";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useAvaliation } from "@/app/contexts/avaliation/useAvaliation";
import { Configs } from "@/app/page";

interface JudgeProps {
  handleNextStep: () => void;
  setConfigs: React.Dispatch<React.SetStateAction<Configs | undefined>>;
}

export const Judge: React.FC<JudgeProps> = ({ handleNextStep, setConfigs }) => {
  const toast = useRef<Toast>(null);

  const { setValues } = useAvaliation();

  const handleValidation = (values: any) => {
    const errors: any = {};

    if (!values.configsFile.name) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Configurações são obrigatórias.",
        life: 3000,
      });
    }

    return errors;
  };

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

  const propsFormik = useFormik<JudgeFormSchema>({
    initialValues,
    onSubmit: ({ judge, configsFile }) => {
      setValues({ judge });
      handleReaderConfigs(configsFile as File);
      handleNextStep();
    },
    validationSchema: toFormikValidationSchema(judgeFormSchema),
    validateOnBlur: false,
    validateOnChange: false,
    validate: handleValidation,
  });

  const { setFieldValue } = propsFormik;

  const handleFetchConfigs = useCallback(async () => {
    const basePath = window.location.origin;
    try {
      const configs = await axios.get(`${basePath}/api/config-default`);
      return configs;
    } catch (error) {
      throw error;
    }
  }, []);

  const handleGenerateFileJsonWithConfigs = useCallback(async () => {
    const configs = await handleFetchConfigs();
    const blob = new Blob([configs.data], { type: "application/json" });

    const file = new File([blob], "configs.json");

    return file;
  }, [handleFetchConfigs]);

  useEffect(() => {
    handleGenerateFileJsonWithConfigs().then((file) => {
      if (file) {
        setFieldValue("configsFile", file);
      }
    });
  }, [handleGenerateFileJsonWithConfigs, setFieldValue]);

  return (
    <form onSubmit={propsFormik.handleSubmit}>
      <Toast ref={toast} />
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
          <Input id="judge" label="Nome do Jurado" propsFormik={propsFormik} />
        </div>

        <Button
          className="w-full justify-center mt-5 bg-blue-600"
          type="submit"
          onClick={() => {
            propsFormik.submitForm();
          }}
        >
          Confirmar Jurado
        </Button>
      </div>
    </form>
  );
};
