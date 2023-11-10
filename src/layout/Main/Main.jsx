import { Outlet } from "react-router-dom";
import Sidebar from "../../page/Shared/SideBar/SideBar";

const Main = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[85px]">
          <Sidebar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
