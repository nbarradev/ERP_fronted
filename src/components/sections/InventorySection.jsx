import { useState, useMemo } from 'react';
import { IconPackages, IconAlertTriangle, IconCurrencyDollar, IconCategory, IconList, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import KpiCard from '../ui/KpiCard.jsx';
import StatusPill from '../ui/StatusPill.jsx';

function fmtMoney(v) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Math.round(v));
}

const cats = ['Electrónica', 'Herramientas', 'Insumos', 'Maquinaria', 'Químicos', 'Textil'];

export default function InventorySection({ productos, onDelete, onOpenEdit, onOpenNew }) {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return productos.filter((p) => {
      const st = p.qty <= p.min ? 'low' : 'ok';
      return (
        (!s || p.nombre.toLowerCase().includes(s) || p.id.toLowerCase().includes(s)) &&
        (!catFilter || p.cat === catFilter) &&
        (!statusFilter || st === statusFilter)
      );
    });
  }, [productos, search, catFilter, statusFilter]);

  const low = productos.filter((p) => p.qty <= p.min);
  const totalVal = productos.reduce((s, p) => s + p.qty * p.precio, 0);
  const uniqueCats = new Set(productos.map((p) => p.cat)).size;

  return (
    <div className="section-block active">
      <div className="kpi-row">
        <KpiCard icon="packages" iconColor="blue" label="Total productos" value={productos.length} sub="SKUs activos" />
        <KpiCard icon="alert-triangle" iconColor="red" label="Bajo stock" value={low.length} sub="requieren reposición" />
        <KpiCard icon="currency-dollar" iconColor="green" label="Valor total" value={fmtMoney(totalVal)} sub="inventario actual" />
        <KpiCard icon="category" iconColor="amber" label="Categorías" value={uniqueCats} sub="tipos de producto" />
      </div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <IconList size={14} style={{ marginRight: 4 }} stroke={2} />
            Stock actual
          </span>
          <button className="btn primary" onClick={onOpenNew}>
            <IconPlus size={14} stroke={2} />
            Registrar producto
          </button>
        </div>
        {low.length > 0 && (
          <div className="alert-row">
            <IconAlertTriangle size={14} stroke={2} />
            <strong>Alerta de stock mínimo:</strong>{' '}
            <span>{low.map((p) => `${p.nombre} (${p.qty} uds)`).join(' · ')}</span>
          </div>
        )}
        <div className="search-bar">
          <input className="inp" type="text" placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="inp" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
            <option value="">Todas las categorías</option>
            {cats.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select className="inp" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Todos los estados</option>
            <option value="ok">Stock OK</option>
            <option value="low">Bajo stock</option>
          </select>
        </div>
        <div className="card-body" style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Producto</th><th>Categoría</th><th>Cant.</th><th>Mín.</th><th>Estado</th><th>Precio unit.</th><th>Valor total</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const st = p.qty <= p.min ? 'low' : 'ok';
                const pct = Math.min(100, Math.round((p.qty / p.min) * 100));
                return (
                  <tr key={p.id}>
                    <td><code style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{p.id}</code></td>
                    <td>
                      <strong style={{ fontWeight: 500 }}>{p.nombre}</strong>
                      <br />
                      <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{p.prov}</span>
                    </td>
                    <td><span className="pill gray">{p.cat}</span></td>
                    <td>
                      <strong style={{ fontWeight: 500 }}>{p.qty}</strong> uds
                      <div className="progress-bar" style={{ marginTop: 4 }}>
                        <div className="progress-fill" style={{ width: `${pct}%`, background: st === 'low' ? '#e53e3e' : '#38a169' }} />
                      </div>
                    </td>
                    <td>{p.min} uds</td>
                    <td><StatusPill status={st} /></td>
                    <td>{fmtMoney(p.precio)}</td>
                    <td>{fmtMoney(p.qty * p.precio)}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn sm" onClick={() => onOpenEdit(p)}>
                        <IconEdit size={12} stroke={2} /> Editar
                      </button>
                      <button className="btn sm danger" style={{ marginLeft: 4 }} onClick={() => onDelete(p)}>
                        <IconTrash size={12} stroke={2} />
                      </button>
                    </td>
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
