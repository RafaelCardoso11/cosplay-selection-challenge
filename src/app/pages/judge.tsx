"use client";
import { Input } from "@/components/Input";
import { Button } from "primereact/button";

interface JudgeProps {
  handleNextPage: () => void;
}
export const Judge: React.FC<JudgeProps> = ({ handleNextPage }) => {
  return (
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
        <Input id="candidato" label="Nome do Jurado" />
      </div>
      <div>
        <Input
          id="configs"
          label="Configurações"
          inputTextProps={{ type: "file", accept: ".json" }}
        />
      </div>
      <Button className="w-full justify-center mt-10" onClick={handleNextPage}>
        Confirmar Configurações
      </Button>
    </div>
  );
};
