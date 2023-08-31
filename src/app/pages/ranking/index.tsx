"use client";
import { Tree } from "primereact/tree";
import { PrimeIcons } from "primereact/api";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Avaliation } from "@/app/page";
import { Button } from "primereact/button";

interface RankingProps {
  avaliation: Avaliation;
  handleBackStep: () => void;
}

interface DataTable {
  key: string;

  data: {
    ranking: string;
    name: string;
    character: string;
    score: number;
  };
  children?: DataTable[];
}

export const Ranking: React.FC<RankingProps> = ({
  avaliation,
  handleBackStep,
}) => {
  const handleSetAvaliationsToLocalStorage = useCallback(
    (avaliations: DataTable[]) => {
      const avaliationForDataTable: DataTable = {
        key: "",
        data: {
          character: avaliation.character,
          name: avaliation.name,
          score: avaliation.totalRating,
          ranking: "",
        },
      };

      avaliations.push(avaliationForDataTable);

      const dataTableActualized = avaliations
        .sort((a, b) => Number(b.data.score) - Number(a.data.score))
        .map((data, index) => {
          return {
            ...data,
            key: index.toString(),
            data: { ...data.data, ranking: `#${index + 1}` },
          };
        });

      localStorage.setItem("avaliations", JSON.stringify(dataTableActualized));

      console.log(dataTableActualized);
      return dataTableActualized;
    },
    [avaliation]
  );

  const dataTable: DataTable[] = useMemo(() => {
    const avaliations = localStorage.getItem("avaliations") as string;

    if (avaliations) {
      const avaliationsParsed = JSON.parse(avaliations) as DataTable[];
      return handleSetAvaliationsToLocalStorage(avaliationsParsed);
    } else {
      return handleSetAvaliationsToLocalStorage([]);
    }
  }, [handleSetAvaliationsToLocalStorage]);

  return (
    <div>
      <div className="card  w-full flex justify-content-center">
        <TreeTable
          tableStyle={{ minWidth: "25rem" }}
          value={dataTable}
          paginator
          rows={5}
          rowsPerPageOptions={[3, 5]}
          className="w-full text-xs"
          footer={"Total de Avaliações: " + dataTable.length}
        >
          <Column field="ranking" header="Ranking" expander></Column>
          <Column field="name" header="Candidato"></Column>
          <Column field="character" header="Personagem"></Column>
          <Column field="score" header="Nota Final"></Column>
        </TreeTable>
      </div>
      <div className="flex justify-center space-x-2 mt-10">
        <Button
          className=" bg-red-700"
          onClick={() => {
            localStorage.removeItem("avaliations");
          }}
        >
          Resetar Avaliações
        </Button>
        <Button className=" bg-blue-700" onClick={handleBackStep}>
          Voltar para a Avaliação
        </Button>
      </div>
    </div>
  );
};
