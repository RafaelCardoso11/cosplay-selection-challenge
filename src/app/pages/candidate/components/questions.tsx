import { generateArrayFromIndex } from "@/app/helpers/generateArrayFromIndex";
import { Category } from "@/app/interfaces/Category";
import { Input } from "@/components/Input";
import { FinalRatings } from "./finalRatings";
import { FieldArrayRenderProps, useFormik } from "formik";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useEffect } from "react";
import { Toast } from "primereact/toast";

interface Props {
  categories: Category[];
  ratings: FieldArrayRenderProps;
}
export const Questions: React.FC<Props> = ({ categories, ratings }) => {
  const formik = useFormik({
    initialValues: {},
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values: any) => {
      categories.forEach(({ scoreFieldName, keyfilter }, index) => {
        if (keyfilter === "pnum") {
          ratings.push({
            value: Number(values[scoreFieldName.toLowerCase() + index]),
          });
        }
      });
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
