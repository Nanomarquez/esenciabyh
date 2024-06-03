import { Box, TextField } from "@mui/material";
import { CalcProps, DataProps } from "../types";
import React from "react";

type ResultKiloProps = {
  data: DataProps;
  calcKg: CalcProps;
  calcGramos: CalcProps;
  setCalcKg: (value: CalcProps) => void;
};

function ResultKilo({ data, calcKg, setCalcKg, calcGramos }: Readonly<ResultKiloProps>) {
  React.useEffect(() => {
    const cantidadCera =
      (calcGramos.cantidadCera * data.cantidadDeVelas) / 1000;
    const esencia = (calcGramos.esencia * data.cantidadDeVelas) / 1000;
    const endurecedor = (calcGramos.endurecedor * data.cantidadDeVelas) / 1000;

    setCalcKg({
      cantidadCera,
      esencia,
      endurecedor,
    });
  }, [data, calcGramos, setCalcKg, calcKg]);

  return (
    <>
      <h1 className="text-2xl font-semibold text-center text-neutral-600">
        CÁLCULO PARA EL LOTE EN KILOGRAMOS
      </h1>
      <Box py={4} pb={16} px={10} display={"flex"} flexDirection={"column"} gap={4}>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          gap={5}
        >
          <TextField
            id="outlined-basic"
            label="Cantidad de cera por lote (kg)"
            variant="standard"
            color="secondary"
            disabled
            focused
            value={calcKg.cantidadCera.toFixed(3)}
            fullWidth
            type="number"
            InputProps={{
              style: {
                fontSize: "1.5rem",
                fontWeight: "800",
                textAlign: "center",
              },
            }}
            inputProps={{
              style: { textAlign: "center" },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Esencia por lote (kg)"
            variant="standard"
            color="secondary"
            focused
            value={calcKg.esencia.toFixed(3)}
            disabled
            fullWidth
            type="number"
            InputProps={{
              style: {
                fontSize: "1.5rem",
                fontWeight: "800",
                textAlign: "center",
              },
            }}
            inputProps={{
              style: { textAlign: "center" },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Endurecedor por lote (Kg)"
            variant="standard"
            color="secondary"
            focused
            value={calcKg.endurecedor.toFixed(3)}
            disabled
            fullWidth
            type="number"
            InputProps={{
              style: {
                fontSize: "1.5rem",
                fontWeight: "800",
                textAlign: "center",
              },
            }}
            inputProps={{
              style: { textAlign: "center" },
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default ResultKilo;
