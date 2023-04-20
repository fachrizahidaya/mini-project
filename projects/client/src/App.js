import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ArticleList } from './Components/ListBlog/ArticleList';
import { ChangePass } from './Components/Profile/ChangePass';
import { MyArticleList } from './Components/Profile/MyArticleList';
import { UpdateProfile } from './Components/Profile/UpdateProfile';
import { BlogPage } from './Pages/Blog';
import { BlogDetail } from './Pages/BlogDetail';
import { ErrorPage } from './Pages/Error';
import { HomePage } from './Pages/Home';
import { LoginForm } from './Pages/Login';
import { Profile } from './Pages/Profile';
import { RegistrationForm } from './Pages/Register';
import { ResetPass } from './Pages/ResetPass';
import { CardCarousel } from './Pages/Test';
import { Verification } from './Pages/Verification';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <BlogPage/> },
      { path: '/blog', element: <BlogDetail/> },
      { path: '/test', element: <CardCarousel/> },
      { path: '/account',
        element: <Profile/>,
        children: [
          { path: '/account/my-article', element: <MyArticleList/> },
          { path: '/account/favorite-article', element: <ArticleList/> },
          { path: '/account/profile-setting', element: <UpdateProfile/> },
          { path: '/account/change-password', element: <ChangePass/> },
        ] 
      },
    ]
  },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegistrationForm /> },
  { path: '/reset-password', element: <ResetPass /> },
  { path: '/verification', element: <Verification /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;