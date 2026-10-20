import { useState } from "react";
import { GeoAltFill } from "react-bootstrap-icons";

// O iframe do Google Maps só carrega no clique: evita ~10 scripts e cookies de terceiros no load.
export function MapaGoogle({ src, endereco, className = "h-[300px] w-full" }) {
  const [mostrarMapa, setMostrarMapa] = useState(false);

  if (mostrarMapa) {
    return (
      <iframe
        title={`Mapa: ${endereco}`}
        src={src}
        className={className}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setMostrarMapa(true)}
      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg bg-white/70 p-6 text-center transition-colors hover:bg-white ${className}`}
    >
      <GeoAltFill className="text-[var(--titulo)]" size={32} aria-hidden="true" />
      <span className="font-semibold">{endereco}</span>
      <span className="text-sm underline">Ver no mapa</span>
    </button>
  );
}

export default MapaGoogle;
