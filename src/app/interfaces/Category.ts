import { KeyFilterType } from "primereact/keyfilter";

export interface Category {
  category: string;
  hasObservation: boolean;
  description: string;
  required: boolean;
  maxScore: number;
  allowDecimal: boolean;
  scoreFieldName: string;
  observationFieldName: string;
  keyfilter: KeyFilterType;
}
