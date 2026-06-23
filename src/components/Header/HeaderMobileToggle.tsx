import { FiMenu, FiX } from 'react-icons/fi';

type HeaderMobileToggleProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HeaderMobileToggle({ isOpen, onClick }: HeaderMobileToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="md:hidden flex items-center justify-center"
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </button>
  );
}