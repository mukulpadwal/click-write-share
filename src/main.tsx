import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  Home,
  Login,
  Signup,
  AllBlogs,
  AddBlog,
  Blog,
  EditBlog,
} from "./pages";
import { Protected } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <Protected authentication={false}>
            <Login />
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false}>
            <Signup />
          </Protected>
        }
      />
      <Route
        path="/all-blogs"
        element={
          <Protected authentication={true}>
            <AllBlogs />
          </Protected>
        }
      />
      <Route
        path="/add-blog"
        element={
          <Protected authentication={true}>
            <AddBlog />
          </Protected>
        }
      />
      <Route
        path="/edit-blog/:slug"
        element={
          <Protected authentication={true}>
            <EditBlog />
          </Protected>
        }
      />
      <Route path="/blog/:slug" element={<Blog />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
