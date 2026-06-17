import { IconAlertTriangle, IconX, IconCheck } from '@tabler/icons-react';

export default function ConfirmModal({ open, title, message, onConfirm, onCancel, confirmLabel = 'Eliminar', confirmClass = 'danger' }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal" style={{ width: 400 }}>
        <div className="modal-head">
          <h3><IconAlertTriangle size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} stroke={2} />{title}</h3>
          <button className="btn sm" onClick={onCancel} aria-label="Cerrar">
            <IconX size={14} stroke={2} />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{message}</p>
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={onCancel}>Cancelar</button>
          <button className={`btn ${confirmClass}`} onClick={onConfirm}>
            <IconCheck size={14} stroke={2} /> {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
