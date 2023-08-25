"use client";
import { Tree } from "primereact/tree";
import { PrimeIcons } from "primereact/api";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
interface RankingProps {}

export const Ranking: React.FC<RankingProps> = () => {
  return (
    <div className="card  w-full flex justify-content-center">
      <TreeTable
        tableStyle={{ minWidth: '25rem' }}
        value={[
          {
            key: "0",

            data: {
              ranking: "#1",
              name: "André Rafael Cardoso Reis",
              character: "Batman",
              score: "93",
            },
            children: [
              {
                key: "0-0",
                label: "Work",
                data: "Work Folder",
                icon: "pi pi-fw pi-cog",
                children: [
                  {
                    key: "0-0-1",
                    label: "Resume.doc",
                    icon: "pi pi-fw pi-file",
                    data: "Resume Document",
                  },
                ],
              },
            ],
          },
          {
            key: "1",

            data: {
              ranking: "#2",
              name: "Rebeca Tavares",
              character: "Barbie",
              score: "23",
            },
            children: [
              {
                key: "0-0",
                label: "Work",
                data: "Work Folder",
                icon: "pi pi-fw pi-cog",
                children: [
                  {
                    key: "0-0-1",
                    label: "Resume.doc",
                    icon: "pi pi-fw pi-file",
                    data: "Resume Document",
                  },
                ],
              },
            ],
          },
          {
            key: "1",

            data: {
              ranking: "#3",
              name: "Amanda Reis",
              character: "Harley",
              score: "10",
            },
            children: [
              {
                key: "0-0",
                label: "Work",
                data: "Work Folder",
                icon: "pi pi-fw pi-cog",
                children: [
                  {
                    key: "0-0-1",
                    label: "Resume.doc",
                    icon: "pi pi-fw pi-file",
                    data: "Resume Document",
                  },
                ],
              },
            ],
          },
        ]}
        className="w-full text-xs"
      >
        <Column field="ranking" header="Ranking" expander></Column>
        <Column field="name" header="Candidato"></Column>
        <Column field="character" header="Personagem"></Column>
        <Column field="score" header="Nota Final"></Column>
      </TreeTable>
    </div>
  );
};
