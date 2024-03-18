import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Produtos from "./Pages/Produtos";
import Beanchmarking from "./Pages/Beanchmarking";
import Request from "./Pages/Request";
import Header from "./components/Header";
import Configuracao from "./Pages/Configuracao";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedUser } = useAuthContext();

  if (!isLoggedUser) {
    return <Login />;
  }

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
