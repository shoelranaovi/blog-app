import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Projects from "./pages/Projects";
import Home from "./pages/Home.jsx";
import Abouts from "./pages/Abouts.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store.js";
import { Provider } from "react-redux";
import ThemeProvider from "./components/ThemeProvider.jsx";
import Dashbord from "./components/Dashbord.jsx";
import Createpost from "./pages/createpost.jsx";
import UpdatePost from "./pages/UpdatePost.jsx";
import Post from "./pages/post.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/project", element: <Projects /> },
      { path: "", element: <Home /> },
      { path: "About", element: <Abouts /> },
      { path: "signIn", element: <Signin /> },
      { path: "signUp", element: <Signup /> },
      { path: "dashbord", element: <Dashbord /> },
      { path: "create-post", element: <Createpost /> },
      { path: "/update-post/:postId", element: <UpdatePost /> },
      { path: "/post/:postId", element: <Post /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={route} />
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
