import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { appRoutersConfig } from "./lib/config/RouteConfig/RouteConfig";

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={appRoutersConfig} />
    </>
  );
}

export default App;
