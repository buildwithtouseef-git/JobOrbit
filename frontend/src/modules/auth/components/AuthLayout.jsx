import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";

function OrbitBrand({ light = false }) {
  return (
    <div className="auth-brand">
      <span className="auth-orbit-mark" aria-hidden="true">
        <span className="auth-orbit-ring" />
        <span className="auth-orbit-core" />
        <span className="auth-orbit-sat" />
      </span>
      <span className={light ? "auth-brand-name auth-brand-name-light" : "auth-brand-name"}>JobOrbit</span>
    </div>
  );
}

const teaserCopy = {
  login: {
    title: "Already orbiting?",
    body: "Sign in to pick up your applications, interviews, and offers right where you left them.",
    cta: "Sign in",
    to: ROUTES.LOGIN,
  },
  register: {
    title: "New here?",
    body: "Create an account and put every application, interview, and offer into one orbit.",
    cta: "Create account",
    to: ROUTES.REGISTER,
  },
};

function TeaserPanel({ type }) {
  const copy = teaserCopy[type];

  return (
    <section className="auth-panel auth-panel-teaser">
      <div className="auth-teaser">
        <OrbitBrand light />
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
        <Link className="auth-ghost-btn" to={copy.to}>
          {copy.cta}
        </Link>
      </div>
    </section>
  );
}

export default function AuthLayout({ active, children }) {
  if (!active) {
    return (
      <main className="auth-screen">
        <div className="stars" />
        <div className="auth-shell-wrap">
          <div className="auth-legacy-shell">{children}</div>
        </div>
      </main>
    );
  }

  const isLogin = active === "login";

  return (
    <main className="auth-screen">
      <div className="stars" />

      <div className="auth-shell-wrap">
        <div className="auth-shell" data-active={active}>
          <div className="auth-mobile-tabs">
            <Link className={isLogin ? "active" : ""} to={ROUTES.LOGIN}>
              Log in
            </Link>
            <Link className={!isLogin ? "active" : ""} to={ROUTES.REGISTER}>
              Sign up
            </Link>
          </div>

          <div className="auth-stage">
            <div className="auth-seam" />
            <div className="auth-comet" />

            {isLogin ? (
              <>
                <section className="auth-panel auth-panel-form">{children}</section>
                <TeaserPanel type="register" />
              </>
            ) : (
              <>
                <TeaserPanel type="login" />
                <section className="auth-panel auth-panel-form">{children}</section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
