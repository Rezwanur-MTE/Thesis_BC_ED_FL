// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./routes/AppLayout";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login";
import UploadFile from "./routes/UploadFile";
import Home from "./routes/Home";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout isLoggedIn={isLoggedIn} />,
      errorElement: <ErrorPage />,
      children: [
        {
          // index route
          path: "/login",
          element: <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />,
        },
        {
          path: "/upload",
          element: <UploadFile isLoggedIn={isLoggedIn} />,
        },
        {
          path: "/home",
          element: <Home isLoggedIn={isLoggedIn} />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
