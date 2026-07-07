import { Toaster } from "sonner";
import { useLocation } from "react-router-dom";
import Navbar from "./shared/components/navbar";
import AppRoutes from "./routes/AppRoutes";
import Providers from "./app/providers";
import "./App.css";

const authFrameRoutes = new Set(["/", "/login", "/register"]);

function App() {
  const { pathname } = useLocation();
  const isAuthFrame = authFrameRoutes.has(pathname);

  return (
    <Providers>
      <div className="min-h-screen bg-transparent text-slate-100">
        {!isAuthFrame ? <Navbar /> : null}
        <main className={isAuthFrame ? "" : "pt-24"}>
          <AppRoutes />
        </main>
        <Toaster position="top-right" richColors />
      </div>
    </Providers>
  );
}

export default App;
