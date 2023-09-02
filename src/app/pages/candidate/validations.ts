import { TypeOf, array, number, object, string } from "zod";

export const candidateFormSchema = object({
  name: string({
    required_error: "O Nome do Candidato é obrigatório",
  }),
  character: string({
    required_error: "O Personagem é obrigatório.",
  }),
  totalRating: number({
    required_error: "Um total rating é obrigatório.",
  }),
  fields: array(object({})),
});

export type CandidateFormSchema = TypeOf<typeof candidateFormSchema>;

export const initialValues: CandidateFormSchema = {
  name: "",
  character: "",
  totalRating: 0,
  fields: []
};
