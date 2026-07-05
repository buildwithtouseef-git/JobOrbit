import { BrowserRouter } from 'react-router-dom';
import { AuthRoutes } from './features/auth/routes/auth.routes';

function App() {
  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  );
}

export default App;