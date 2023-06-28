import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AfterAuth from './Components/AfterAuth';
import { ArticleList } from './Components/ListBlog/ArticleList';
import { ChangePass } from './Components/Profile/ChangePass';
import { MyArticleList } from './Components/Profile/MyArticleList';
import { UpdateProfile } from './Components/Profile/UpdateProfile';
import RequireAuth from './Components/RequireAuth';
import { axios } from './helper/axios';
import { BlogPage } from './Pages/Blog';
import { BlogDetail } from './Pages/BlogDetail';
import { CreateBlog } from './Pages/CreateBlog';
import { ErrorPage } from './Pages/Error';
import { HomePage } from './Pages/Home';
import { LoginForm } from './Pages/Login';
import { Profile } from './Pages/Profile';
import { RegistrationForm } from './Pages/Register';
import { ResetPass } from './Pages/ResetPass';
import { Search } from './Pages/Search';
import { Verification } from './Pages/Verification';
import { VerifyForm } from './Pages/VerifyForm';
import { setAuth } from './redux/userSlice';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <BlogPage /> },
      { path: "/blog", element: <BlogDetail /> },
      { path: "/search", element: <Search /> },
      {
        // halaman diakses harus login
        element: <RequireAuth />,
        children: [
          { path: "/create", element: <CreateBlog /> },
          {
            path: "/account",
            element: <Profile />,
            children: [
              { path: "/account/my-article", element: <MyArticleList /> },
              { path: "/account/favorite-article", element: <ArticleList /> },
              { path: "/account/profile-setting", element: <UpdateProfile /> },
              { path: "/account/change-password", element: <ChangePass /> },
            ],
          },
        ],
      },
    ],
  },

  // halaman setelah login gaboleh akses
  {
    element: <AfterAuth />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegistrationForm /> },
      { path: "/verify", element: <VerifyForm /> },
      { path: "/reset-password", element: <ResetPass /> },
      { path: "/verification/:token", element: <Verification /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const keepLogin = async () => {
    try {
      const res = await axios.get("/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { username, email, phone, imgProfile } = res.data;
      dispatch(setAuth({ username, email, phone, imgProfile }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    token ? keepLogin() : console.log("Login First");
  }, []);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
