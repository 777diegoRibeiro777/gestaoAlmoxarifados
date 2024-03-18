import { Routes, Route } from "react-router-dom";
import Produtos from "./Pages/Produtos";
import Request from "./Pages/Request";
import Header from "./components/Header";
import { useAuthContext } from "./context/AuthContext";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Produtos />} />
      </Routes>
    </>
  );
}

export default App;
