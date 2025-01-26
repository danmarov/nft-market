import MainLayout from "@/components/layouts/main-layout";
import Providers from "@/components/providers";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/home";
import GiftPage from "./pages/gift";
import HandleGiftRedirectPage from "./pages/handle-gift-redirect";
import MyGifts from "./pages/my-gifts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {/* <HandleRedirect> */}
        <HomePage />
        {/* </HandleRedirect> */}
      </>
    ),
  },
  {
    path: "handle-gift-redirect",
    element: <HandleGiftRedirectPage />,
  },
  {
    path: "gift",
    element: <GiftPage />,
  },
  {
    path: "gifts",
    element: (
      <MainLayout>
        <MyGifts />
      </MainLayout>
    ),
  },
  {
    path: "activity",
    element: (
      <MainLayout>
        <div className="min-h-[calc(100svh-200px)] flex items-center justify-center">
          <div className="bg-card w-[80%] py-12 text-center rounded-md text-lg font-semibold">
            Comming soon...
          </div>
        </div>
      </MainLayout>
    ),
  },
]);

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
