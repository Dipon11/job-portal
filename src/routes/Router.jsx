import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import CategoryCompany from "../page/CategoryCompany";
import Home from "../page/Home";
import CastPage from "../page/CastPage";
import CharacterDetailPage from "../page/CharacterDetailPage";




const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "category/:id",
        element: <CategoryCompany />,
        loader: () => fetch("/data.json"),
      },

    ],
  },
  {
    path: "/cast",
    Component: CastPage,
  },
  {
    path: "/character/:id",
    Component: CharacterDetailPage,
  },


  {
    path: "/*",
    element: <h2>Error 404</h2>,
  },
]);

export default router;
