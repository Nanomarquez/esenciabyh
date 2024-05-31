import { Outlet , Navigate } from "react-router-dom";
function AuthLayout() {

  const isAuth = false;

  return (
    <>
      {isAuth ? (
        <Navigate to="/"/>
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col bg-[#e7b1b1]">
            <Outlet/>
          </section>
        </>
      )}
    </>
  );
}

export default AuthLayout;
