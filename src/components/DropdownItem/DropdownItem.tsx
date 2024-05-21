interface DropdownItemProps {
  onClick: () => void;
  children: React.ReactNode;
}

const DropdownItem = ({ onClick, children }: DropdownItemProps) => (
  <div
    className="cursor-pointer px-2 py-1.5 rounded-md hover:bg-accent"
    onClick={onClick}
  >
    {children}
  </div>
);

export default DropdownItem;
