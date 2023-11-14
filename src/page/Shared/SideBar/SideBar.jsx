import { FaTasks, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="hidden md:block w-[75px] h-screen fixed top-0 border-r-2 border-secondary/20">
      <div className="flex flex-col items-center gap-5 h-full py-5">
        <NavLink to="/">
          <img
            src="https://cktechcheck.com/wp-content/uploads/2023/04/todoist-logo.webp"
            className="w-2/3 mx-auto"
            alt="logo"
          />
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-[#E44332] text-white cursor-pointer"
              : "p-2 rounded-2xl group hover:bg-[#E44332] text-white cursor-pointer transition-all"
          }
        >
          <FaTasks className="h-7 w-7 group-hover:text-white" />
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-[#E44332] text-white cursor-pointer mt-auto"
              : "p-2 rounded-2xl group hover:bg-[#E44332] text-gray-600 cursor-pointer transition-all  mt-auto"
          }
        >
          <FaUserCircle className="h-7 w-7 group-hover:text-white " />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
