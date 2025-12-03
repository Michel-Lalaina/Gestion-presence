


import { Outlet } from "react-router-dom";
import { Side } from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">

      {/* SIDEBAR FIXE */}
      <Side/>

      {/* CONTENU QUI CHANGE */}
      <main className="w-full flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
