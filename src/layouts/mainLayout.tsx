


import { Outlet } from "react-router-dom";
import { Side } from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen w-screen bg-gray-50">

      {/* Sidebar FIXE */}
      <div className="w-72 shrink-0">
        <Side />
      </div>

      {/* Contenu qui prend TOUT LE RESTE */}
      <main className="w-max flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}

