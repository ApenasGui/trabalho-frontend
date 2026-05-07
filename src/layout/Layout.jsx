import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout(){
    return <>
        <aside className="w-64 bg-gray-200 p-4">
            <Navbar />
        </aside>

        <main className="flex-1 p-4">
            <Outlet />
        </main>
    </>
}