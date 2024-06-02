import { useUserContext } from "@/context/UserContext";
import { Outlet, Navigate } from "react-router-dom";
import BannerCO from "../assets/CO0A0535.jpg";

function AuthLayout() {
  const { isAuth } = useUserContext();

  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <section className="flex flex-1 justify-center items-center flex-col" style={{ backgroundImage: `url(${BannerCO})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
          <Outlet />
        </section>
      )}
    </>
  );
}

export default AuthLayout;
