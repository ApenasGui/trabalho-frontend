import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Layout from "./layout/Layout";
import { useAuth } from "./contexts/AuthContext";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";

export default function App() {

  const { logged } = useAuth();

  return (
      <Routes>
        {logged ? (
        <Route path="/" element={<Layout />}> {}
          <Route index element={<Home />} />
          <Route path="list" element={<List />} />
          <Route path="*" element={<Error404 />}/>
        </Route>
        ) : (
          <>
            <Route path="login" element={<Login />} />
          </>
        )}
      </Routes>
  );
};