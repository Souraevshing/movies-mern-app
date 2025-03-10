import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import ErrorPage from "./components/Error.tsx";
import Home from "./components/Home.tsx";
import Movies from "./components/Movies.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import "./index.css";
import store from "./store/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth/signin", element: <SignIn /> },
      { path: "/auth/signup", element: <SignUp /> },
      { path: "/movies", element: <Movies /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
