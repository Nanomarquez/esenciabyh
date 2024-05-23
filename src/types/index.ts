
export type DataProps = {
  gramosPorCadaVela: number;
  cantidadDeVelas: number;
  porcientoEsencia: number;
  porcientoEndurecedor: number;
};

export type FormCalculadoraProps = {
  data: DataProps;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSliderChange: (name: string, value: number | number[]) => void;
};

export type CalcProps = {
  cantidadCera: number;
  esencia: number;
  endurecedor: number;
}