import cieloLogo from "../../assets/img/logos/Logo_of_Cielo.png";

interface CieloLogoProps {
  className?: string;
}

export default function CieloLogo({
  className = "h-5 w-auto",
}: CieloLogoProps) {
  return (
    <img src={cieloLogo} alt="Provedor de pagamento" className={className} />
  );
}
