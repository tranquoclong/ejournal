import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/Search";
import CategoryPage from "./pages/Category";
import PostDetailPage from "./pages/PostDetail";
import PageNotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { actFetchCategoriesAsync } from "./store/category/actions";
//import { actFetchMainMenusAsync } from "./store/menus/actions";
import { actGetMeAsync } from "./store/user/actions";
import { actSetToken } from "./store/auth/actions";
import { useIsLogin } from "./hooks/useIsLogin";

function App() {
  const dispatch = useDispatch();
 // const lang = useSelector((state) => state.App.lang);
  const routeMatch = useRouteMatch("/dashboard");

  // useEffect(() => {
  //   dispatch(actFetchMainMenusAsync());
  //   // eslint-disable-next-line
  // }, [lang]);

  useEffect(() => {
    dispatch(actFetchCategoriesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      dispatch(actGetMeAsync());
      dispatch(actSetToken(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
const { isLogin, admin } = useIsLogin();
console.log(isLogin);
  return (
    <main className="home-default">
      {!routeMatch && <Header />}
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/category/:slug">
          <CategoryPage />
        </Route>
        <Route path="/post/:slug">
          <PostDetailPage />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        {/* <Route path="/" exact>
          <HomePage />
        </Route> */}
        <Route
          path="/"
          exact
          render={() =>
            isLogin ? (
              admin !== "ADMIN" ? (
                <HomePage />
              ) : (
                <Redirect
                  to={{
                    pathname: "/dashboard",
                  }}
                />
              )
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            )
          }
        />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      {!routeMatch && (
        <>
          <div className="spacing"></div>
          {/* <Footer /> */}
        </>
      )}
    </main>
  );
}

export default App;
