
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

export type IUser = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  imageUrl: string;
  imageId: string;
  phone: string;
  new: boolean;
};

export type INewUser = {
  name: string;
  email: string;
  lastname: string;
  phone?: string;
  password: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  password: string;
  newPassword?: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
  emailChange: boolean;
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>
}
