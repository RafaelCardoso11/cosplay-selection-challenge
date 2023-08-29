import { generateArrayFromIndex } from "@/app/helpers/generateArrayFromIndex";
import { Category } from "@/app/interfaces/Category";
import { Input } from "@/components/Input";
import { FinalRatings } from "./finalRatings";
import { FieldArrayRenderProps, FormikProps, useFormik } from "formik";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useEffect, useRef } from "react";
import { CandidateFormSchema } from "../../validations";
import { initialValues } from "./validations";
import { Toast } from "primereact/toast";
import { isObjectEmpty } from "@/app/helpers/isObjectEmpty";

interface Props {
  categories: Category[];
  formikProps: FormikProps<CandidateFormSchema>;
  resetAvaliation: boolean;
}

export const Questions: React.FC<Props> = ({
  categories,
  formikProps,
  resetAvaliation,
}) => {
  const toast = useRef<Toast>(null);
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      formikProps.setFieldValue("totalRating", values.ratings);
    },
    validate: (values: any) => {
      let errors: any = {};
      categories.forEach(
        ({ category, scoreFieldName, required, maxScore }, index) => {
          if (required && values[scoreFieldName.toLowerCase() + index] === "") {
            errors[
              scoreFieldName.toLowerCase() + index
            ] = `A avaliação da categoria "${category}" é obrigatória`;
          }
          if (
            maxScore &&
            values[scoreFieldName.toLowerCase() + index] > maxScore
          ) {
            errors[
              scoreFieldName.toLowerCase() + index
            ] = `A avaliação deve ser somente até ${maxScore}`;
          }
        }
      );

      if(!isObjectEmpty(errors)){
        toast.current?.show({
          severity: "error",
          summary: "Erros encontrados",
          detail: Object.values(errors).join(' - '),
          life: 3000,
        });

      }
      
      return errors;
    },
  });

  useEffect(() => {
    categories.forEach(({ scoreFieldName }, index) => {
      formik.setFieldValue(scoreFieldName.toLowerCase() + index, "");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);
  return (
    <div>
      <Toast ref={toast} />
      <Accordion
        multiple
        activeIndex={generateArrayFromIndex(categories.length)}
        className="space-y-5"
      >
        {categories.map(
          (
            {
              category,
              hasObservation,
              description,
              observationFieldName,
              scoreFieldName,
              maxScore,
              keyfilter,
            },
            index
          ) => (
            <AccordionTab
              header={
                <>
                  {index + 1}. {category}
                </>
              }
              key={index}
            >
              <div>
                <h2 className="text-1xl w-full  mb-4">{description}</h2>
                <div className="space-y-5">
                  <Input
                    id={scoreFieldName.toLowerCase() + index}
                    inputTextProps={{
                      keyfilter,
                      tooltip: maxScore?.toString(),
                    }}
                    propsFormik={formik}
                    label={scoreFieldName}
                  />
                  {hasObservation && (
                    <Input
                      id={category + "_obs"}
                      propsFormik={formik}
                      label={observationFieldName}
                    />
                  )}
                </div>
              </div>
            </AccordionTab>
          )
        )}
      </Accordion>
      <div className="mt-10">
        <FinalRatings formikProps={formik} />
      </div>
    </div>
  );
};
