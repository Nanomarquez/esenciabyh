// src/App.tsx
import React from "react";
import Navbar from "./components/Navbar";
import FormCalculadora from "./components/FormCalculadora";
import ResultGramo from "./components/ResultGramo";
import ResultKilo from "./components/ResultKilo";
import { CalcProps, DataProps } from "./types";
import SimpleBackdrop from "./components/Dialog";
import { Slideshow } from "./components/Slide";

const App: React.FC = () => {
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
    <main>
      <SimpleBackdrop></SimpleBackdrop>
      <Navbar />
      <section>
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
      </section>
    </main>
  );
};

export default App;
