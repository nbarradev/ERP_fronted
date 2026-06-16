import { useState, useMemo } from 'react';
import { IconTruck, IconPackages, IconRoad, IconCircleCheck, IconTruckDelivery, IconPlus, IconArrowRight } from '@tabler/icons-react';
import KpiCard from '../ui/KpiCard.jsx';
import StatusPill from '../ui/StatusPill.jsx';

export default function DispatchSection({ despachos, onStatusChange, onOpenNew }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return despachos.filter((d) =>
      (!s || d.dest.toLowerCase().includes(s) || d.trans.toLowerCase().includes(s)) &&
      (!statusFilter || d.status === statusFilter)
    );
  }, [despachos, search, statusFilter]);

  return (
    <div className="section-block active">
      <div className="kpi-row">
        <KpiCard icon="truck" iconColor="blue" label="Total despachos" value={despachos.length} sub="registrados" />
        <KpiCard icon="packages" iconColor="amber" label="En bodega" value={despachos.filter((d) => d.status === 'En bodega').length} sub="esperando salida" />
        <KpiCard icon="road" iconColor="purple" label="En tránsito" value={despachos.filter((d) => d.status === 'En tránsito').length} sub="en camino" />
        <KpiCard icon="circle-check" iconColor="green" label="Entregados" value={despachos.filter((d) => d.status === 'Entregado').length} sub="completados" />
      </div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <IconTruckDelivery size={14} style={{ marginRight: 4 }} stroke={2} />
            Control de despachos
          </span>
          <button className="btn primary" onClick={onOpenNew}>
            <IconPlus size={14} stroke={2} />
            Nuevo despacho
          </button>
        </div>
        <div className="search-bar">
          <input className="inp" type="text" placeholder="Buscar destino o transportista..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="inp" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos los estados</option>
            <option value="En bodega">En bodega</option>
            <option value="En tránsito">En tránsito</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>
        <div className="card-body" style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>N° Despacho</th><th>Destino</th><th>Transportista</th><th>Productos</th><th>Salida</th><th>Entrega est.</th><th>Estado</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => {
                const nextSt = d.status === 'En bodega' ? 'En tránsito' : d.status === 'En tránsito' ? 'Entregado' : null;
                const advBtn = nextSt ? (
                  <button className="btn sm primary" onClick={() => onStatusChange(d.id, nextSt)}>
                    <IconArrowRight size={12} stroke={2} /> {nextSt}
                  </button>
                ) : (
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: 11 }}>Completado</span>
                );
                return (
                  <tr key={d.id}>
                    <td><code style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{d.id}</code></td>
                    <td><strong style={{ fontWeight: 500 }}>{d.dest}</strong></td>
                    <td>{d.trans}</td>
                    <td style={{ maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.prod}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{d.sal}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{d.est}</td>
                    <td><StatusPill status={d.status} /></td>
                    <td style={{ whiteSpace: 'nowrap' }}>{advBtn}</td>
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
