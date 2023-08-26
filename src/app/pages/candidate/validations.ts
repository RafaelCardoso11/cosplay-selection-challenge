import { TypeOf, object, string } from "zod";

export const candidateFormSchema = object({
  candidate: string({
    required_error: "O Nome do Candidato é obrigatório",
  }),
  character: string({
    required_error: "O Personagem é obrigatório."
  }),
});

export type CandidateFormSchema = TypeOf<typeof candidateFormSchema>;

export const initialValues: CandidateFormSchema = {
  candidate: "",
  character: "",
};
