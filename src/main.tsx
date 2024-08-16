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
  AllPosts,
  AddPost,
  Post,
  EditPost,
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
        path="/all-posts"
        element={
          <Protected authentication={true}>
            <AllPosts />
          </Protected>
        }
      />
      <Route
        path="/add-post"
        element={
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        }
      />
      <Route path="/post/:slug" element={<Post />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
