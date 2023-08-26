"use client";
import { Input } from "@/components/Input";
import { Button } from "primereact/button";
import { Formik, FormikProps } from "formik";

import { File as FileInput } from "@/components/file";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import axios from "axios";

interface ConfigsProps {}

export default function Configs(): ConfigsProps {
  return (
    <div>
      <FileInput id="configsFile" label="Configurações" accept=".json" />

      <Button className="w-full justify-center mt-10">
        Confirmar Configurações
      </Button>
    </div>
  );
}
