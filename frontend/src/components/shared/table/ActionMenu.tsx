import { SettingsIcon } from '@/assests/icons';
import Button from '../button';
import useClickOutside from '@/utils/hooks/useClickOutside';
import { FC, useState } from 'react';

interface ActionMenuProps {
  id?: number;
  onEdit: (id?: number) => void;
  onDelete: (id?: number) => void;
}
const ActionMenu: FC<ActionMenuProps> = ({ id, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="">
      <img
        className="setting-icon"
        width={20}
        height={20}
        src={SettingsIcon}
        alt="Setting icon"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div ref={popupRef} className="setting-action-buttons">
          <Button onClick={() => onEdit(id)} label="Edit" />
          <Button onClick={() => onDelete(id)} label="Delete" />
        </div>
      )}
    </div>
  );
};
export default ActionMenu;
