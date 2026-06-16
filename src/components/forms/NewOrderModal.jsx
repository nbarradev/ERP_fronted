import { useState } from 'react';
import { IconShoppingCart, IconCheck } from '@tabler/icons-react';
import Modal from '../ui/Modal.jsx';

const cats = ['Electrónica', 'Herramientas', 'Insumos', 'Maquinaria', 'Químicos', 'Textil'];

export default function NewOrderModal({ open, onClose, onSubmit }) {
  const [prov, setProv] = useState('');
  const [prod, setProd] = useState('');
  const [qty, setQty] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');
  const [cat, setCat] = useState(cats[0]);
  const [obs, setObs] = useState('');

  const handleSubmit = () => {
    const p = prov.trim();
    const pr = prod.trim();
    if (!p || !pr) { alert('Completa proveedor y producto'); return; }
    const q = parseInt(qty) || 1;
    const price = parseFloat(precio) || 0;
    onSubmit({
      prov: p,
      prod: `${pr} x${q}`,
      qty: q,
      monto: q * price,
      fecha: fecha || new Date().toISOString().slice(0, 10),
      status: 'Pendiente',
    });
    setProv('');
    setProd('');
    setQty('');
    setPrecio('');
    setFecha('');
    setObs('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Nueva orden de compra" icon={IconShoppingCart}>
      <div className="form-grid">
        <div className="form-row">
          <label>Proveedor</label>
          <input type="text" placeholder="Nombre del proveedor" value={prov} onChange={(e) => setProv(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Producto</label>
          <input type="text" placeholder="Descripción del producto" value={prod} onChange={(e) => setProd(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Cantidad</label>
          <input type="number" placeholder="0" min={1} value={qty} onChange={(e) => setQty(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Precio unitario ($)</label>
          <input type="number" placeholder="0.00" step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Fecha requerida</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Categoría</label>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            {cats.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <label>Observaciones</label>
        <textarea rows={2} placeholder="Notas adicionales..." value={obs} onChange={(e) => setObs(e.target.value)} />
      </div>
      <div className="modal-foot">
        <button className="btn" onClick={onClose}>Cancelar</button>
        <button className="btn primary" onClick={handleSubmit}>
          <IconCheck size={14} stroke={2} /> Crear orden
        </button>
      </div>
    </Modal>
  );
}
