import logo from '../../assets/img/novaLogo.svg';

type LogoProps = {
  className?: string;
  imageClassName?: string;
  href?: string;
};

export default function Logo({
  className = '',
  imageClassName = '',
  href = '/',
}: LogoProps) {
  return (
    <a href={href} className={`inline-flex items-center shrink-0 ${className}`.trim()}>
      <img src={logo} alt="Logo IPPS" className={imageClassName} />
    </a>
  );
}