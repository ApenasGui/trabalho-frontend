import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });
  const [logged, setLogged] = useState(() => !!localStorage.getItem("usuario"));

  const login = (dados, lembrarMe = false) => {
    setUsuario(dados);
    setLogged(true);
    if (lembrarMe) {
      localStorage.setItem("usuario", JSON.stringify(dados));
    }
  };

  const logout = () => {
    setUsuario(null);
    setLogged(false);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ logged, usuario, setUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider };