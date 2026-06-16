import { IconHelpCircle, IconBell } from '@tabler/icons-react';

const titles = {
  inv: 'Administración de Inventarios',
  ord: 'Gestión de Órdenes de Compra',
  des: 'Control de Despachos',
};

export default function Topbar({ activeSection }) {
  return (
    <header className="topbar">
      <div className="topbar-title">{titles[activeSection]}</div>
      <div className="topbar-actions">
        <button className="btn" onClick={() => {}}>
          <IconHelpCircle size={14} stroke={2} />
          Ayuda con informe ↗
        </button>
        <button className="btn" style={{ position: 'relative' }}>
          <IconBell size={14} stroke={2} />
          <span className="badge-notif" style={{ position: 'absolute', top: -4, right: -4 }}>3</span>
        </button>
      </div>
    </header>
  );
}
