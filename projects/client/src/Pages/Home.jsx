import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
