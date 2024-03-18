import { Link } from "react-router-dom";
import "./_style.scss";
import "react";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

export default function Header() {
  const { logoutAuthContext } = useAuthContext();

  useEffect(() => {
    const icon = document.getElementById("icon");
    const icon1 = document.getElementById("a");
    const icon2 = document.getElementById("b");
    const icon3 = document.getElementById("c");
    const nav = document.getElementById("nav");
    const blue = document.getElementById("blue");

    const handleClick = () => {
      icon1.classList.toggle("a");
      icon2.classList.toggle("c");
      icon3.classList.toggle("b");
      nav.classList.toggle("show");
      blue.classList.toggle("slide");
    };

    icon.addEventListener("click", handleClick);

    return () => {
      icon.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <header className="header-hamburger flex-space-between flex-space-between-header">
        <div className="hamburger-icon" id="icon">
          <div className="icon-1" id="a"></div>
          <div className="icon-2" id="b"></div>
          <div className="icon-3" id="c"></div>
          <div className="clear"></div>
        </div>
        <nav id="nav">
          <ul className="flex-space-between-list flex-space-between g-2">
            <li>
              <Link className="nav-link">
                Produtos
              </Link>
            </li>
            <li>
              <Link className="nav-link">
                Requisição
              </Link>
            </li>
            <li>
              <Link className="nav-link">
                Beachmarking Log
              </Link>
            </li>
            <li>
              <Link className="nav-link">
                Configurações
              </Link>
            </li>
            <li>
              <Link className="nav-link">
                Almoxarifados
              </Link>
            </li>
          </ul>
        </nav>
        <button className="btnSair btnRed">
          Sair
        </button>
        {/* <div className="dark-blue" id="blue"></div> */}
      </header>
    </>
  );
}