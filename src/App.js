import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      {" "}
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
