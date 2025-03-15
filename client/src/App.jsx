import { lazy, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import PageRouter from "./Routes";
import { GlobalProvider } from "./context/GlobalContext";
const Loader = lazy(() => import("./components/Loader"));
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <GlobalProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={PageRouter} />
          <Toaster />
        </Suspense>
      </GlobalProvider>
    </ErrorBoundary>
  );
}

export default App;
