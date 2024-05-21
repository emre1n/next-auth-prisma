'use client';

import DropdownItem from '@/components/DropdownItem';
import { useEffect, useRef } from 'react';

interface DropdownMenuProps {
  isOpen: boolean;
  items: { label: string; onClick: () => void }[];
  onClose: () => void;
}

const DropdownMenu = ({ isOpen, items, onClose }: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute flex flex-col top-12 right-1 p-1 bg-secondary border border-primary rounded-md text-sm"
    >
      {items.map((item, index) => (
        <DropdownItem key={index} onClick={item.onClick}>
          {item.label}
        </DropdownItem>
      ))}
    </div>
  );
};

export default DropdownMenu;
