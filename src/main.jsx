import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";
import AuthProvider from "./provider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="w-screen bg-gradient-to-t from-[#eedec5] to-[#ddebcd]);">
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </div>
);
