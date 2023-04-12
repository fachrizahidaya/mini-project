import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './Pages/Error';
import { HomePage } from './Pages/Home';
import { LoginForm } from './Pages/Login';
import { RegistrationForm } from './Pages/Register';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegistrationForm /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;