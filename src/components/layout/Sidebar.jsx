import { IconBuildingWarehouse, IconPackages, IconShoppingCart, IconTruckDelivery, IconChartBar, IconFileExport } from '@tabler/icons-react';

const navItems = [
  { key: 'inv', label: 'Inventario', icon: IconPackages },
  { key: 'ord', label: 'Órdenes de Compra', icon: IconShoppingCart },
  { key: 'des', label: 'Control de Despachos', icon: IconTruckDelivery },
];

export default function Sidebar({ activeSection, onChangeSection }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-name">
          <IconBuildingWarehouse size={18} stroke={2} />
          LogiERP Pro
        </div>
        <div className="brand-sub">Sistema de Gestión Logística</div>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-label">Principal</div>
        {navItems.map((item) => (
          <div
            key={item.key}
            className={`nav-item ${activeSection === item.key ? 'active' : ''}`}
            onClick={() => onChangeSection(item.key)}
          >
            <item.icon size={17} stroke={2} />
            {item.label}
          </div>
        ))}
        <div className="nav-label" style={{ marginTop: 8 }}>Reportes</div>
        <div className={`nav-item ${activeSection === 'dash' ? 'active' : ''}`} onClick={() => onChangeSection('dash')}>
          <IconChartBar size={17} stroke={2} />
          Dashboard
        </div>
        <div className="nav-item" onClick={() => {}}>
          <IconFileExport size={17} stroke={2} />
          Exportar datos ↗
        </div>
      </nav>
      <div className="sidebar-footer">
        <div className="user-row">
          <div className="user-av">CM</div>
          <div className="user-info">
            <div className="u-name">Carlos Muñoz</div>
            <div className="u-role">Administrador</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
