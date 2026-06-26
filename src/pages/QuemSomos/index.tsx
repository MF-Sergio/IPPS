import { PeopleFill, ShieldCheck, HeartFill } from "react-bootstrap-icons";
import Hero from "./components/Hero/Hero";
import NossaHistoria from "./components/NossaHistoria/NossaHistoria";
import NossaTrajetoria from "./components/NossaTrajetoria/NossaTrajetoria";
import NossosNumeros from "./components/NossosNumeros/NossosNumeros";
import Doacao from "../Home/components/Doacao/Doacao";
import Newsletter from "../Home/components/Newsletter/Newsletter";

export default function QuemSomos() {
	return (
		<div className="bg-[var(--fundo)] pb-16">
			<Hero />

            <NossaHistoria />
            <NossaTrajetoria />
			<NossosNumeros />
			<Doacao />
			<Newsletter />

		</div>
	);
}
