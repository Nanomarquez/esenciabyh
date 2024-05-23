import { Box, TextField } from "@mui/material";
import { CalcProps, DataProps } from "../types";
import React from "react";

type ResultGramoProps = {
  data: DataProps;
  calcGramos: CalcProps;
  calcKg: CalcProps;
  setCalcGramos: (value: CalcProps) => void;
};

function ResultGramo({
  data,
  calcGramos,
  setCalcGramos,
  calcKg,
}: Readonly<ResultGramoProps>) {
  React.useEffect(() => {
    const esencia = (data.porcientoEsencia / 100) * data.gramosPorCadaVela;
    const endurecedor =
      (data.porcientoEndurecedor / 100) * data.gramosPorCadaVela;
    const cantidadCera = data.gramosPorCadaVela - esencia - endurecedor;

    setCalcGramos({
      cantidadCera,
      esencia,
      endurecedor,
    });
  }, [data, setCalcGramos, calcGramos, calcKg]);

  return (
    <>
      <h1 className="text-2xl font-semibold text-center text-neutral-600">
        CÁLCULO POR VELA EN GRAMOS
      </h1>
      <Box py={4} px={10} display={"flex"} flexDirection={"column"} gap={4}>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          gap={5}
        >
          <TextField
            id="outlined-basic"
            label="Cantidad de cera por vaso (grs)"
            variant="standard"
            color="secondary"
            disabled
            focused
            fullWidth
            value={calcGramos.cantidadCera.toFixed(1)}
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
            label="Esencia por vaso (grs)"
            variant="standard"
            color="secondary"
            focused
            value={calcGramos.esencia.toFixed(1)}
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
            label="Cantidad de endurecedor (grs)"
            variant="standard"
            color="secondary"
            focused
            value={calcGramos.endurecedor.toFixed(1)}
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

export default ResultGramo;
