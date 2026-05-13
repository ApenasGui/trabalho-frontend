import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);

    const login = (dados) => {
        setUser({nome: dados.nome});
        setLogged(true);
    }

    const logout = () => {
        setUser({});
        setLogged(false);
    }

    return (  
    <AuthContext.Provider value={{ logged, user, login, logout }}> 
        {children}
    </AuthContext.Provider>
    )

}
function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth deve ser usado dentro do AuthProvider")
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export {useAuth, AuthProvider};