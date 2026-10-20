import logoNova from '../../assets/img/novaLogo.webp';
import logoPadrao from '../../assets/img/logo.webp';

type LogoProps = {
  className?: string;
  imageClassName?: string;
  href?: string;
  variant?: 'default' | 'nova';
};

// width/height intrínsecos: reservam o espaço e evitam layout shift
const logoVariants = {
  default: { src: logoPadrao, width: 174, height: 184 },
  nova: { src: logoNova, width: 172, height: 158 },
};

export default function Logo({
  className = '',
  imageClassName = '',
  href = '/',
  variant = 'default',
}: LogoProps) {
  const { src, width, height } = logoVariants[variant];

  return (
    <a href={href} className={`inline-flex items-center shrink-0 ${className}`.trim()}>
      <img src={src} width={width} height={height} alt="Logo IPPS" className={imageClassName} />
    </a>
  );
}