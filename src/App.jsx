import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Signup from "./pages/Signup";
import Layout from "./layout/Layout";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}> {}
          <Route index element={<Home />} />
          <Route path="list" element={<List />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" />
        </Route>
      </Routes>
  );
};