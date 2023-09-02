"use client";
import { Tree } from "primereact/tree";
import { PrimeIcons } from "primereact/api";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { useRef, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { useAvaliation } from "@/app/contexts/avaliation/useAvaliation";
import { IAvaliation } from "@/app/contexts/avaliation/interface";
import { Modal } from "@/components/modal";
import { Toast } from "primereact/toast";

interface RankingProps {
  handleBackStep: () => void;
}

interface DataTable {
  key: string;

  data: {
    ranking: string;
    name: string;
    character: string;
    totalRating: number;
    judge: string;
  };
  children?: DataTable[];
}

export const Ranking: React.FC<RankingProps> = ({ handleBackStep }) => {
  const toast = useRef<Toast>(null);
  const { getAvaliations, resetAvaliations } = useAvaliation();

  const [openModalResetAvaliations, setOpenModalResetAvaliations] =
    useState(false);

  const handleFormatAvaliationToDataTable = (avaliations: IAvaliation[]) => {
    const dataTable = avaliations
      .sort(
        (a, b) =>
          Number(b.candidate.totalRating) - Number(a.candidate.totalRating)
      )
      .map((avaliation, index) => {
        const avaliationForDataTable: DataTable = {
          key: index.toString(),
          data: {
            character: avaliation.candidate.character,
            name: avaliation.candidate.name,
            totalRating: avaliation.candidate.totalRating,
            ranking: `#${index + 1}`,
            judge: avaliation.judge,
          },
        };

        return avaliationForDataTable;
      });
    return dataTable;
  };

  const dataTable: DataTable[] = useMemo(() => {
    const avaliations = getAvaliations();

    return handleFormatAvaliationToDataTable(avaliations);
  }, [getAvaliations]);

  const handleCloseModalResetAvaliations = () => {
    setOpenModalResetAvaliations(false);
  };
  const handleResetAvaliations = () => {
    setOpenModalResetAvaliations(false);

    toast.current?.show({
      severity: "success",
      summary: "Resetado!",
      detail: "O Ranking foi resetado.",
    });

    resetAvaliations();
    handleBackStep()
    
  };

  return (
    <div>
      <div className="card  w-full flex justify-content-center">
        <TreeTable
          tableStyle={{ minWidth: "30rem" }}
          value={dataTable}
          paginator
          rows={5}
          rowsPerPageOptions={[3, 5]}
          className="w-full text-xs"
          emptyMessage="Nenhuma avaliação"
          footer={"Total de Avaliações: " + dataTable.length}
        >
         
          <Column field="ranking" header="Ranking" expander></Column>
          <Column field="totalRating" header="Nota Final"></Column>
          <Column field="name" header="Candidato"></Column>
          <Column field="character" header="Personagem"></Column>
          <Column field="judge" header="Jurado"></Column>
        </TreeTable>
      </div>
      <div className="flex justify-center space-x-2 mt-10">
        <Button
          className=" bg-red-700"
          onClick={() => {
            setOpenModalResetAvaliations(true);
          }}
        >
          Resetar Avaliações
        </Button>
        <Button className=" bg-blue-700" onClick={handleBackStep}>
          Voltar para a Avaliação
        </Button>
        <Modal
          title="Você tem certeza?"
          description="Ao aceitar você perderá todas suas avaliações. (Impossível desfazer)"
          setVisible={setOpenModalResetAvaliations}
          className="grid grid-cols-2 gap-4 justify-center"
          visible={openModalResetAvaliations}
        >
          <Button
            className="bg-blue-500 justify-center"
            onClick={handleCloseModalResetAvaliations}
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-600 justify-center"
            onClick={handleResetAvaliations}
          >
            Confirmar
          </Button>
        </Modal>
      </div>
      <Toast ref={toast} />
    </div>
  );
};
