import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AfterAuth from './Components/AfterAuth';
import { ArticleList } from './Components/listBlog/ArticleList';
import { ChangePass } from './Components/profile/ChangePass';
import { MyArticleList } from './Components/profile/MyArticleList';
import { UpdateProfile } from './Components/profile/UpdateProfile';
import RequireAuth from './Components/RequireAuth';
import { axios } from './helper/axios';
import { BlogPage } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { CreateBlog } from './pages/CreateBlog';
import { ErrorPage } from './pages/Error';
import { HomePage } from './pages/Home';
import { LoginForm } from './pages/Login';
import { Profile } from './pages/Profile';
import { RegistrationForm } from './pages/Register';
import { ResetPass } from './pages/ResetPass';
import { Search } from './pages/Search';
import { Verification } from './pages/Verification';
import { VerifyForm } from './pages/VerifyForm';
import { setAuth } from './redux/userSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <BlogPage/> },
      { path: '/blog', element: <BlogDetail/> },
      { path: '/search', element: <Search/> },
      {
        // halaman diakses harus login
        element: <RequireAuth />,
        children: [
          { path: '/create', element: <CreateBlog/> },
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
    ]
  },

  // halaman setelah login gaboleh akses
  {
    element: <AfterAuth />,
    children: [
      { path: '/login', element: <LoginForm /> },
      { path: '/register', element: <RegistrationForm /> },
      { path: '/verify', element: <VerifyForm /> },
      { path: '/reset-password', element: <ResetPass /> },
      { path: '/verification/:token', element: <Verification /> },
    ]
  }
]);

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token");

  const keepLogin = async () => {
    try {
      const res = await axios.get('/auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { username, email, phone, imgProfile } = res.data
      dispatch(setAuth({ username, email, phone, imgProfile }));

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    token ? keepLogin() : console.log("Login First");
  }, [])
  
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;