import AuthProvider from "../modules/auth/context/AuthProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}