import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Bell, ChevronDown, LogOut, Settings } from "lucide-react";
import useAuth from "../../modules/auth/context/useAuth";
import useLogout from "../../modules/auth/hooks/useLogout";
import { ROUTES } from "../constants/routes";
import "./navbar.css";


function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const { logout, loading } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = user?.fullName?.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "JO";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to={ROUTES.ROOT} className="navbar-brand" aria-label="JobOrbit home">
          <span className="orbit-mark">
            <span className="ring" />
            <span className="core" />
            <span className="sat" />
          </span>
          <span className="brand-name">JobOrbit</span>
        </NavLink>

        <nav className="navbar-actions" aria-label="Primary navigation">
          {isAuthenticated ? (
            <>
              <button type="button" className="rounded-full border border-white/10 p-2 text-slate-100 hover:bg-white/10" aria-label="Notifications">
                <Bell size={18} />
              </button>
              <div className="relative">
                <button type="button" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm" onClick={() => setMenuOpen((prev) => !prev)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 font-semibold text-white">{initials}</div>
                  <span className="hidden sm:inline">{user?.fullName || "Member"}</span>
                  <ChevronDown size={16} />
                </button>
                {menuOpen ? (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl">
                    <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 font-semibold text-white">{initials}</div>
                      <div>
                        <p className="font-semibold">{user?.fullName || "JobOrbit member"}</p>
                        <p className="text-sm text-slate-400">{user?.email || "member@joborbit.com"}</p>
                      </div>
                    </div>
                    <Link to={ROUTES.CHANGE_PASSWORD} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={() => setMenuOpen(false)}>
                      <Settings size={16} />
                      Settings
                    </Link>
                    <button type="button" className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/10" onClick={() => { setMenuOpen(false); logout(); }} disabled={loading}>
                      <LogOut size={16} />
                      {loading ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <NavLink to={ROUTES.LOGIN} className={({ isActive }) => `nav-btn nav-btn-ghost${isActive ? " active" : ""}`}>
                Login
              </NavLink>
              <NavLink to={ROUTES.REGISTER} className={({ isActive }) => `nav-btn nav-btn-solid${isActive ? " active" : ""}`}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
