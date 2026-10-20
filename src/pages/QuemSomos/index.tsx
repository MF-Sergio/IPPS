import { lazy, Suspense } from "react";
import { PeopleFill, ShieldCheck, HeartFill } from "react-bootstrap-icons";
import Hero from "./components/Hero/Hero";
import NossaHistoria from "./components/NossaHistoria/NossaHistoria";
import NossaTrajetoria from "./components/NossaTrajetoria/NossaTrajetoria";
import Doacao from "../Home/components/Doacao/Doacao";

// recharts (~250 kB) só é baixado quando a seção de gráficos renderiza
const NossosNumeros = lazy(() => import("./components/NossosNumeros/NossosNumeros"));
import { OutrosParceiros } from "../Home/components/OutrosParceiros/OutrosParceiros";
import Newsletter from "../Home/components/Newsletter/Newsletter";

export default function QuemSomos() {
  return (
    <div className="pb-16">
      <Hero />
      <NossaHistoria />
      <NossaTrajetoria />
      <Suspense fallback={<div className="min-h-[500px]" />}>
        <NossosNumeros />
      </Suspense>
      <Doacao />
      <OutrosParceiros />
      {/* <Newsletter /> */}
    </div>
  );
}
