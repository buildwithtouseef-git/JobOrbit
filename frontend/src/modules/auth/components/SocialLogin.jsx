const providers = [
  {
    name: "Google",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.9v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.6-2.6C16.9 3.9 14.7 3 12 3 6.9 3 2.8 7.1 2.8 12.2S6.9 21.4 12 21.4c6.9 0 9.4-4.8 9.4-7.9 0-.5-.05-.9-.13-1.3H12z" />
      </svg>
    ),
  },
  {
    name: "Microsoft",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" fill="#F35325" />
        <rect x="13" y="3" width="8" height="8" fill="#81BC06" />
        <rect x="3" y="13" width="8" height="8" fill="#05A6F0" />
        <rect x="13" y="13" width="8" height="8" fill="#FFBA08" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.35 4.7-4.58 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
      </svg>
    ),
  },
];

export default function SocialLogin({ label = "Continue with" }) {
  return (
    <>
      <div className="auth-divider">{label}</div>
      <div className="auth-social-row">
        {providers.map((provider) => (
          <button key={provider.name} className="auth-social-btn" type="button" aria-label={`${label} ${provider.name}`}>
            {provider.icon}
            {provider.name}
          </button>
        ))}
      </div>
    </>
  );
}
