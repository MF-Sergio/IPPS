import { FiMenu, FiX } from "react-icons/fi";

type HeaderMobileToggleProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HeaderMobileToggle({
  isOpen,
  onClick,
}: HeaderMobileToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center md:hidden"
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={isOpen}
    >
      <FiMenu size={28} />
    </button>
  );
}
