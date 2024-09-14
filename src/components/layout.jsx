import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen p-3">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
