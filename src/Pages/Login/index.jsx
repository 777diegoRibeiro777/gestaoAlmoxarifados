import { useState } from "react";
import "./_style.scss";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [form, setForm] = useState();
  const { loginAuthContext } = useAuthContext();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (form.user === "admin" && form.password === "admin") {
      loginAuthContext({
        user: form.user,
        password: form.password,
      });
      navigate("/");
    } else {
      toast.error("Usuário ou senha inválidos");
    }
  }

  function onChange(e) {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <>
      <div className="page">
        <form onSubmit={(e) => handleLogin(e)} className="formLogin">
          <h1 className="text-center mb-3">Login</h1>
          <p>Digite os seus dados de acesso no campo abaixo.</p>
          <input
            type="text"
            name="user"
            placeholder="Digite seu usuário"
            id="user"
            className="search w-100"
            autoComplete="off"
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            className="search mt-2 w-100"
            id="password"
            autoComplete="off"
            onChange={onChange}
          />
          <a href="/">Esqueci minha senha</a>
          <input type="submit" value="Acessar" className="btn" />
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
