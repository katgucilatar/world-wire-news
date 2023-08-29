import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { CurrentUserProvider } from "./context";

import App from "./App";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import SearchNews from "./pages/SearchNews";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<Landing />} />
      <Route path="search-news" element={<SearchNews />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="homepage" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <CurrentUserProvider>
        <RouterProvider router={router} />
      </CurrentUserProvider>
    </CookiesProvider>
  </React.StrictMode>
);
