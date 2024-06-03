import FormCalculadora from "@/components/shared/FormCalculadora";
import ResultGramo from "@/components/shared/ResultGramo";
import ResultKilo from "@/components/shared/ResultKilo";
import { CalcProps, DataProps } from "@/types";
import React from "react";

function Calculadora() {
  const [data, setData] = React.useState<DataProps>({
    gramosPorCadaVela: 0,
    cantidadDeVelas: 0,
    porcientoEsencia: 0,
    porcientoEndurecedor: 0,
  });

  const [calcGramos, setCalcGramos] = React.useState<CalcProps>({
    cantidadCera: 0.0,
    esencia: 0.0,
    endurecedor: 0.0,
  });

  const [calcKg, setCalcKg] = React.useState<CalcProps>({
    cantidadCera: 0.0,
    esencia: 0.0,
    endurecedor: 0.0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSliderChange = (name: string, value: number | number[]) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value as number,
    }));
  };

  return (
    <div className="mt-16 w-full flex flex-col items-center">
      <FormCalculadora
        data={data}
        onChange={handleChange}
        onSliderChange={handleSliderChange}
      />
      <ResultGramo
        data={data}
        calcGramos={calcGramos}
        calcKg={calcKg}
        setCalcGramos={setCalcGramos}
      />
      <ResultKilo
        data={data}
        calcKg={calcKg}
        setCalcKg={setCalcKg}
        calcGramos={calcGramos}
      />
    </div>
  );
}

export default Calculadora;
