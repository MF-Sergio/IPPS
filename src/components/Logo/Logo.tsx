import logoNova from '../../assets/img/novaLogo.svg';
import logoPadrao from '../../assets/img/logo.png';

type LogoProps = {
  className?: string;
  imageClassName?: string;
  href?: string;
  variant?: 'default' | 'nova';
};

const logoVariants = {
  default: logoPadrao,
  nova: logoNova,
};

export default function Logo({
  className = '',
  imageClassName = '',
  href = '/',
  variant = 'default',
}: LogoProps) {
  const source = logoVariants[variant];

  return (
    <a href={href} className={`inline-flex items-center shrink-0 ${className}`.trim()}>
      <img src={source} alt="Logo IPPS" className={imageClassName} />
    </a>
  );
}