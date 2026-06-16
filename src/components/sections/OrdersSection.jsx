import { useState, useMemo } from 'react';
import { IconFileInvoice, IconClock, IconCheck, IconX, IconShoppingCart, IconPlus, IconRefresh } from '@tabler/icons-react';
import KpiCard from '../ui/KpiCard.jsx';
import StatusPill from '../ui/StatusPill.jsx';

function fmtMoney(v) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Math.round(v));
}

export default function OrdersSection({ ordenes, onStatusChange, onOpenNew }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return ordenes.filter((o) =>
      (!s || o.prov.toLowerCase().includes(s) || o.prod.toLowerCase().includes(s)) &&
      (!statusFilter || o.status === statusFilter)
    );
  }, [ordenes, search, statusFilter]);

  return (
    <div className="section-block active">
      <div className="kpi-row">
        <KpiCard icon="file-invoice" iconColor="blue" label="Total órdenes" value={ordenes.length} sub="registradas" />
        <KpiCard icon="clock" iconColor="amber" label="Pendientes" value={ordenes.filter((o) => o.status === 'Pendiente').length} sub="esperando aprobación" />
        <KpiCard icon="check" iconColor="green" label="Aprobadas" value={ordenes.filter((o) => o.status === 'Aprobado').length} sub="este mes" />
        <KpiCard icon="x" iconColor="red" label="Rechazadas" value={ordenes.filter((o) => o.status === 'Rechazado').length} sub="requieren revisión" />
      </div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <IconShoppingCart size={14} style={{ marginRight: 4 }} stroke={2} />
            Historial de órdenes
          </span>
          <button className="btn primary" onClick={onOpenNew}>
            <IconPlus size={14} stroke={2} />
            Nueva orden
          </button>
        </div>
        <div className="search-bar">
          <input className="inp" type="text" placeholder="Buscar proveedor o producto..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="inp" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
          </select>
        </div>
        <div className="card-body" style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>N° Orden</th><th>Proveedor</th><th>Producto</th><th>Cantidad</th><th>Monto</th><th>Fecha</th><th>Estado</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => {
                const actions = o.status === 'Pendiente' ? (
                  <>
                    <button className="btn sm primary" onClick={() => onStatusChange(o.id, 'Aprobado')}>
                      <IconCheck size={12} stroke={2} /> Aprobar
                    </button>
                    <button className="btn sm danger" style={{ marginLeft: 4 }} onClick={() => onStatusChange(o.id, 'Rechazado')}>
                      <IconX size={12} stroke={2} /> Rechazar
                    </button>
                  </>
                ) : (
                  <button className="btn sm" onClick={() => onStatusChange(o.id, 'Pendiente')}>
                    <IconRefresh size={12} stroke={2} /> Reabrir
                  </button>
                );
                return (
                  <tr key={o.id}>
                    <td><code style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{o.id}</code></td>
                    <td><strong style={{ fontWeight: 500 }}>{o.prov}</strong></td>
                    <td>{o.prod}</td>
                    <td>{o.qty} uds</td>
                    <td>{fmtMoney(o.monto)}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{o.fecha}</td>
                    <td><StatusPill status={o.status} /></td>
                    <td style={{ whiteSpace: 'nowrap' }}>{actions}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
