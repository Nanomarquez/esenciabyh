import TextField from "@mui/material/TextField";
import { Box, Slider } from "@mui/material";
import { FormCalculadoraProps } from "../../types";

function FormCalculadora({
  data,
  onChange,
  onSliderChange,
}: Readonly<FormCalculadoraProps>) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center text-neutral-600 mt-8">
        CALCULADORA PARA PRODUCCIÓN DE VELAS
      </h1>
      <Box
        py={4}
        px={{ xs: 5, md: 10 }}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
      >
        <Box
          display={"flex"}
          gap={5}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <TextField
            id="outlined-basic"
            name="gramosPorCadaVela"
            label="Gramos por cada vela"
            variant="outlined"
            color="secondary"
            size="small"
            focused
            value={data.gramosPorCadaVela}
            onChange={onChange}
            fullWidth
            type="number"
          />
          <TextField
            id="outlined-basic"
            name="cantidadDeVelas"
            label="Cantidad de velas a elaborar"
            variant="outlined"
            color="secondary"
            focused
            value={data.cantidadDeVelas}
            onChange={onChange}
            size="small"
            fullWidth
            type="number"
          />
        </Box>
        <Box
          display={"flex"}
          gap={5}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <label htmlFor="%esencia">% Esencia:</label>
              <span>{data.porcientoEsencia}%</span>
            </Box>
            <Slider
              id="%esencia"
              size="small"
              name="porcientoEsencia"
              defaultValue={0}
              aria-label="Small"
              max={50}
              value={data.porcientoEsencia}
              onChange={(_e, value) =>
                onSliderChange("porcientoEsencia", value)
              }
              valueLabelDisplay="auto"
              color="secondary"
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <label htmlFor="%esencia">% Endurecedor</label>
              <span>{data.porcientoEndurecedor}%</span>
            </Box>
            <Slider
              max={50}
              id="%esencia"
              size="small"
              name="porcientoEndurecedor"
              value={data.porcientoEndurecedor}
              onChange={(_e, value) =>
                onSliderChange("porcientoEndurecedor", value)
              }
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="auto"
              color="secondary"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default FormCalculadora;
