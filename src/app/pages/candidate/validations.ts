import { TypeOf, array, object, string } from "zod";

export const candidateFormSchema = object({
  candidate: string({
    required_error: "O Nome do Candidato é obrigatório",
  }),
  character: string({
    required_error: "O Personagem é obrigatório.",
  }),
  ratings: array(
    object({
      value: string({
        required_error: "Obrigatório",
      }),
    })
  ).refine((value) => value.length > 0, {
    message: 'O array "ratings" é obrigatório e não pode estar vazio',
  }),
});

export type CandidateFormSchema = TypeOf<typeof candidateFormSchema>;

export const initialValues: CandidateFormSchema = {
  candidate: "",
  character: "",
  ratings: [],
};
