import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { routes } from "./routers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
