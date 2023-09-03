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
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

interface RankingProps {
  handleBackStep: () => void;
}

interface DataTable {
  key: string;
  isChildren: boolean;
  data: {
    ranking: string;
    name?: string;
    character?: string;
    totalRating: number;
    judge?: string;
  };
  children?: DataTable[];
}

export const Ranking: React.FC<RankingProps> = ({ handleBackStep }) => {
  const toast = useRef<Toast>(null);
  const { getAvaliations, resetAvaliations, deleteAvaliation } =
    useAvaliation();

  const [openModalResetAvaliations, setOpenModalResetAvaliations] =
    useState(false);

  const [refresh, setRefresh] = useState(true);

  const handleFormatAvaliationToDataTable = (avaliations: IAvaliation[]) => {
    const dataTable = avaliations
      .sort(
        (a, b) =>
          Number(b.candidate.totalRating) - Number(a.candidate.totalRating)
      )
      .map((avaliation, index) => {
        const avaliationForDataTable: DataTable = {
          key: index.toString(),
          isChildren: false,
          data: {
            character: avaliation.candidate.character,
            name: avaliation.candidate.name,
            totalRating: avaliation.candidate.totalRating,
            ranking: `#${index + 1}`,
            judge: avaliation.judge,
          },
          children: avaliation.candidate.fields.map(
            ({ category, totalRating, value }, index) => {
              return {
                key: index.toString(),
                isChildren: true,
                data: {
                  totalRating: totalRating,
                  ranking: category,
                  name: value,
                },
              };
            }
          ),
        };

        return avaliationForDataTable;
      });
    return dataTable;
  };

  const dataTable: DataTable[] = useMemo(() => {
    const avaliations = getAvaliations();

    console.log(avaliations);
    if (refresh) {
      return handleFormatAvaliationToDataTable(avaliations);
    }
    setRefresh(true);
    return [];
  }, [getAvaliations, refresh]);

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
    handleBackStep();
  };

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };

  const AvaliationDeleteActionTemplate = (option: DataTable) => {
    const accept = () => {
      deleteAvaliation(Number(option.key));

      toast.current?.show({
        severity: "success",
        summary: "Deletado",
        detail: "A Avaliação foi deletada com Sucesso.",
      });
      handleRefresh();
    };

    const openDialogConfirm = () => {
      confirmDialog({
        message: "Você realmente deseja deletar essa avaliação?",
        header: "Deletar Avaliação",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        style: { width: "80vw", maxWidth: "30rem" },
        acceptLabel: "SIM",
        rejectLabel: "NÃO",
        accept,
      });
    };

    return !option.isChildren ? (
      <div className="flex justify-content-start">
        <Button
          icon="pi pi-trash"
          onClick={openDialogConfirm}
          severity="danger"
        />
      </div>
    ) : (
      <></>
    );
  };

  return (
    <div>
      <div className="card  w-full flex justify-content-center">
        <TreeTable
          tableStyle={{ minWidth: "50rem" }}
          metaKeySelection={false}
          value={dataTable}
          paginator
          rows={5}
          selectionMode="single"
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
          <Column body={AvaliationDeleteActionTemplate} header="Ações" />
        </TreeTable>
      </div>
      <div className="flex justify-center space-x-2 mt-10">
        <Button
          severity="danger"
          onClick={() => {
            setOpenModalResetAvaliations(true);
          }}
        >
          Resetar Avaliações
        </Button>
        <Button severity="info" onClick={handleBackStep}>
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
            className="justify-center"
            severity="secondary"
            onClick={handleCloseModalResetAvaliations}
          >
            Cancelar
          </Button>
          <Button
            className="justify-center"
            severity="danger"
            onClick={handleResetAvaliations}
          >
            Confirmar
          </Button>
        </Modal>
      </div>
      <Toast ref={toast} />
      <ConfirmDialog />
    </div>
  );
};
