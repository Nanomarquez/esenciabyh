import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { createContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_USER = {
  id: "",
  name: "",
  lastname: "",
  email: "",
  phone: "",
  imageUrl: "",
  new: false,
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuth: false,
  setUser: () => {},
  setIsAuth: () => {},
  checkAuthUser: async () => false as boolean,
};

export const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          lastname: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          phone: currentAccount.bio,
          new: currentAccount.new,
        });
        setIsAuth(true);
        return true;
      }
      setIsAuth(false);
      return false;
    } catch (error) {
      setIsAuth(false);
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if (
    //   localStorage.getItem("cookieFallback") === "[]" ||
    //   localStorage.getItem("cookieFallback") === null
    // )
    //   navigate("/sign-in");
    checkAuthUser();
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      isAuth,
      setIsAuth,
      checkAuthUser,
    }),
    [user, isLoading, isAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
