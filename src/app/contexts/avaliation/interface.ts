export interface IAvaliation {
  judge: string;
  candidate: {
    name: string;
    character: string;
    totalRating: number;
    fields: [];
  };
}
