import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { routes } from "./routers";

const SITE_URL = "https://ipps.com.br";

function setHead(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

// index.html traz os valores da Home (fallback sem JS); aqui cada rota sobrescreve title/description/canonical/robots
function useRouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = routes.find((r) => r.path === pathname) ?? routes.find((r) => r.path === "*");
    if (!route) return;
    const { title, description, noindex } = route.seo;
    const url = route.path === "*" ? `${SITE_URL}/` : `${SITE_URL}${route.path === "/" ? "/" : route.path}`;

    document.title = title;
    setHead('meta[name="description"]', "content", description);
    setHead('meta[name="robots"]', "content", noindex ? "noindex, follow" : "index, follow");
    setHead('link[rel="canonical"]', "href", url);
    setHead('meta[property="og:title"]', "content", title);
    setHead('meta[property="og:description"]', "content", description);
    setHead('meta[property="og:url"]', "content", url);
  }, [pathname]);
}

function AppContent() {
  useRouteSeo();

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-black focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="mx-auto sm:mt-15 w-full max-w-[1160px] outline-none">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
