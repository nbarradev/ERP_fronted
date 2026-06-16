import { IconX } from '@tabler/icons-react';

export default function Modal({ open, onClose, title, icon: Icon, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-head">
          <h3>{Icon && <Icon size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} stroke={2} />}{title}</h3>
          <button className="btn sm" onClick={onClose} aria-label="Cerrar">
            <IconX size={14} stroke={2} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
