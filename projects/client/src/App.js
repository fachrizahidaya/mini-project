import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BlogPage } from './Pages/Blog';
import { BlogDetail } from './Pages/BlogDetail';
import { ErrorPage } from './Pages/Error';
import { HomePage } from './Pages/Home';
import { LoginForm } from './Pages/Login';
import { RegistrationForm } from './Pages/Register';
import { ResetPass } from './Pages/ResetPass';
import { CardCarousel } from './Pages/Test';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <BlogPage/> },
      { path: '/blog', element: <BlogDetail/> },
      { path: '/test', element: <CardCarousel/> },
    ]
  },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegistrationForm /> },
  { path: '/reset-password', element: <ResetPass /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;