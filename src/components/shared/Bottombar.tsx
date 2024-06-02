import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

function Bottombar() {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks?.map((list) => (
        <Link
          to={list.route}
          key={list.label}
          className={`${
            pathname === list.route && "bg-[#e48a8a]"
          } flex-center flex-col gap-1 p-2 rounded-[10px] transition`}
        >
          <p className="tiny-medium text-light-2">{list.label}</p>
        </Link>
      ))}
    </section>
  );
}

export default Bottombar;
