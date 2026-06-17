import { useMemo } from 'react';
import { IconPackages, IconAlertTriangle, IconShoppingCart, IconTruck, IconChartBar } from '@tabler/icons-react';
import KpiCard from '../ui/KpiCard.jsx';
import StatusPill from '../ui/StatusPill.jsx';

function fmtMoney(v) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Math.round(v));
}

export default function DashboardSection({ productos, ordenes, despachos }) {
  const stats = useMemo(() => {
    const low = productos.filter((p) => p.qty <= p.min);
    const pending = ordenes.filter((o) => o.status === 'Pendiente');
    const activeDesp = despachos.filter((d) => d.status !== 'Entregado');
    return { low, pending, activeDesp };
  }, [productos, ordenes, despachos]);

  const byCategory = useMemo(() => {
    const map = {};
    productos.forEach((p) => {
      map[p.cat] = (map[p.cat] || 0) + 1;
    });
    const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const max = entries[0]?.[1] || 1;
    return { entries, max };
  }, [productos]);

  const orderCounts = useMemo(() => {
    const total = ordenes.length || 1;
    const pend = ordenes.filter((o) => o.status === 'Pendiente').length;
    const aprob = ordenes.filter((o) => o.status === 'Aprobado').length;
    const rech = ordenes.filter((o) => o.status === 'Rechazado').length;
    return { total, pend, aprob, rech };
  }, [ordenes]);

  const activeDespachos = useMemo(() => {
    return despachos.filter((d) => d.status !== 'Entregado');
  }, [despachos]);

  const recentActivity = useMemo(() => {
    const items = [
      ...ordenes.map((o) => ({ ...o, type: 'order', label: `Orden ${o.id} — ${o.status}` })),
      ...despachos.map((d) => ({ ...d, type: 'dispatch', label: `Despacho ${d.id} — ${d.status}` })),
    ];
    items.sort((a, b) => {
      const dateA = a.fecha || a.sal || '';
      const dateB = b.fecha || b.sal || '';
      return dateB.localeCompare(dateA);
    });
    return items.slice(0, 6);
  }, [ordenes, despachos]);

  return (
    <div className="section-block active">
      <div className="kpi-row">
        <KpiCard icon="packages" iconColor="blue" label="Total productos" value={productos.length} sub="SKUs en inventario" />
        <KpiCard icon="alert-triangle" iconColor="red" label="Bajo stock" value={stats.low.length} sub="requieren reposición" />
        <KpiCard icon="shopping-cart" iconColor="amber" label="Órdenes pendientes" value={stats.pending.length} sub="esperando aprobación" />
        <KpiCard icon="truck" iconColor="purple" label="Despachos activos" value={stats.activeDesp.length} sub="en bodega o tránsito" />
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <span className="card-title"><IconPackages size={14} style={{ marginRight: 4 }} stroke={2} />Productos por categoría</span>
          </div>
          <div className="card-body" style={{ padding: '16px 18px' }}>
            {byCategory.entries.map(([cat, count]) => {
              const pct = (count / byCategory.max) * 100;
              return (
                <div key={cat} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span>{cat}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{count} ({Math.round((count / productos.length) * 100)}%)</span>
                  </div>
                  <div className="progress-bar" style={{ width: '100%', height: 8 }}>
                    <div className="progress-fill" style={{ width: `${pct}%`, height: 8, background: '#1a5ca8' }} />
                  </div>
                </div>
              );
            })}
            {byCategory.entries.length === 0 && (
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Sin productos registrados</div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title"><IconShoppingCart size={14} style={{ marginRight: 4 }} stroke={2} />Órdenes por estado</span>
          </div>
          <div className="card-body" style={{ padding: '16px 18px' }}>
            {[
              { label: 'Pendientes', count: orderCounts.pend, color: '#d69e2e' },
              { label: 'Aprobadas', count: orderCounts.aprob, color: '#38a169' },
              { label: 'Rechazadas', count: orderCounts.rech, color: '#e53e3e' },
            ].map((item) => {
              const pct = (item.count / orderCounts.total) * 100;
              return (
                <div key={item.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span>{item.label}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{item.count} ({Math.round(pct)}%)</span>
                  </div>
                  <div className="progress-bar" style={{ width: '100%', height: 8 }}>
                    <div className="progress-fill" style={{ width: `${pct}%`, height: 8, background: item.color }} />
                  </div>
                </div>
              );
            })}
            {ordenes.length === 0 && (
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Sin órdenes registradas</div>
            )}
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <span className="card-title"><IconTruck size={14} style={{ marginRight: 4 }} stroke={2} />Despachos activos</span>
          </div>
          <div className="card-body" style={{ padding: '12px 18px' }}>
            {activeDespachos.length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '8px 0' }}>No hay despachos activos</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Destino</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDespachos.map((d) => (
                    <tr key={d.id}>
                      <td><code style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{d.id}</code></td>
                      <td><strong style={{ fontWeight: 500 }}>{d.dest}</strong></td>
                      <td><StatusPill status={d.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title"><IconChartBar size={14} style={{ marginRight: 4 }} stroke={2} />Actividad reciente</span>
          </div>
          <div className="card-body" style={{ padding: '12px 18px' }}>
            {recentActivity.length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '8px 0' }}>Sin actividad registrada</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {recentActivity.map((item) => (
                  <div key={`${item.type}-${item.id}`} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, padding: '4px 0' }}>
                    <span style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{item.fecha || item.sal}</span>
                    <StatusPill status={item.status} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>{item.id}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.dest || item.prov}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
