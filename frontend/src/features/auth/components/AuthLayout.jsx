import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";
import "./AuthLayout.css";

function AuthLayout({ active }) {
  const cometRef = useRef(null);

  useEffect(() => {
    const comet = cometRef.current;
    if (!comet) return;
    comet.classList.remove("fire");

    comet.offsetWidth;
    comet.classList.add("fire");
  }, [active]);

  return (
    <div className="auth-page">
      <div className="stars" />

      <div className="shell">
        <div className="mobile-tabs">
          <Link to="/login" className={active === "login" ? "active" : ""}>
            Log in
          </Link>
          <Link to="/signup" className={active === "signup" ? "active" : ""}>
            Sign up
          </Link>
        </div>

        <div className="stage" data-active={active} data-mobile-active={active}>
          <div className="seam" />
          <div className="comet" ref={cometRef} />

          {/* ============ LOGIN SIDE ============ */}
          <div className={`side login${active === "login" ? " is-active" : " is-inactive"}`}>
            <div className="full-content">
              <LoginForm />
            </div>
            <div className="teaser-content">
              <div className="brand">
                <span className="orbit-mark">
                  <span className="ring" />
                  <span className="core" />
                  <span className="sat" />
                </span>
                <span className="brand-name">JobOrbit</span>
              </div>
              <h2>Already orbiting?</h2>
              <p>Sign in to pick up your applications, interviews, and offers right where you left them.</p>
              <Link to="/login" className="btn-ghost">
                Sign in
              </Link>
            </div>
          </div>

          {/* ============ REGISTER SIDE ============ */}
          <div className={`side signup${active === "signup" ? " is-active" : " is-inactive"}`}>
            <div className="full-content">
              <SignupForm />
            </div>
            <div className="teaser-content">
              <div className="brand">
                <span className="orbit-mark">
                  <span className="ring" />
                  <span className="core" />
                  <span className="sat" />
                </span>
                <span className="brand-name">JobOrbit</span>
              </div>
              <h2>New here?</h2>
              <p>Create an account and put every application, interview, and offer into one orbit.</p>
              <Link to="/signup" className="btn-ghost">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
