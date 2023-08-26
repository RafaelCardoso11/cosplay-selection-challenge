import { TypeOf, number, object, string, union } from "zod";


export const judgeFormSchema = object({
  judge: string({
    required_error: "O nome do Jurado é obrigatório!",
  }),
  configsFile: union([
    object({
      name: string(),
      type: string(),
      size: number(),
    }),
    string(),
  ])
});

export const initialValues = {
  judge: "",
  configsFile: { name: "", size: 0, type: "" },
};
export type JudgeFormSchema = TypeOf<typeof judgeFormSchema>;
