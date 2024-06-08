import { Bottombar, Topbar } from "@/components/shared";
import { useUserContext } from "@/context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

function RootLayout() {
  const { isAuth } = useUserContext();

  return (
    <>
      {!isAuth ? (
        <Navigate to="/sign-in" />
      ) : (
        <div className="w-full relative">
          <Topbar/>
          <section
            className="flex flex-1 h-full"
          >
            <Outlet />
          </section>
          <Bottombar />
        </div>
      )}
    </>
  );
}

export default RootLayout;
