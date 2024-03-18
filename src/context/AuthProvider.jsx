// AuthContext.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const initialUserData = JSON.parse(localStorage.getItem("userData")) || null;
  const [userData, setUserData] = useState(initialUserData);
  const [isLoggedUser, setIsLoggedUser] = useState(initialUserData !== null);

  useEffect(() => {
    const contact = {
      email: "lerocha644@gmail.com",
      whatsapp: "79988353265",
    };
    localStorage.setItem("dataContact", JSON.stringify(contact));
    if (userData) {
      setIsLoggedUser(true);
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      console.log("Usuário não logado");
      localStorage.removeItem("userData");
    }
  }, [userData]);

  const login = (userDataResponse) => {
    setUserData(userDataResponse);
    navigate("/produtos");
  };

  const logout = () => {
    setUserData(null);
    navigate("/");
    window.location.reload();
  };

  const authContextValue = {
    userDataAuthContext: userData,
    isLoggedUser,
    logoutAuthContext: logout,
    loginAuthContext: login,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
