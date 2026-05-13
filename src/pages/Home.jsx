import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const {user} = useAuth();
  
  return (
    <>
      <h1> Bem vindo, {user.nome}</h1>
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-lg text-gray-600">This is the home page of our React application.</p>
    </>
  );
}