import logo from '../../assets/img/novaLogo.svg';

export default function Logo() {
  return (
    <a href="/" className="flex items-center shrink-0">
      <img src={logo} alt="Logo IPPS" />
    </a>
  );
}