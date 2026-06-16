import { useState } from 'react';
import { IconPlus, IconCheck } from '@tabler/icons-react';
import Modal from '../ui/Modal.jsx';

const cats = ['Electrónica', 'Herramientas', 'Insumos', 'Maquinaria', 'Químicos', 'Textil'];

export default function NewProductModal({ open, onClose, onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [cat, setCat] = useState(cats[0]);
  const [qty, setQty] = useState('');
  const [min, setMin] = useState('');
  const [precio, setPrecio] = useState('');
  const [prov, setProv] = useState('');

  const handleSubmit = () => {
    const n = nombre.trim();
    if (!n) { alert('Ingresa el nombre del producto'); return; }
    onSubmit({
      nombre: n,
      cat,
      qty: parseInt(qty) || 0,
      min: parseInt(min) || 0,
      precio: parseFloat(precio) || 0,
      prov: prov || 'Sin proveedor',
    });
    setNombre('');
    setQty('');
    setMin('');
    setPrecio('');
    setProv('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Registrar producto" icon={IconPlus}>
      <div className="form-grid">
        <div className="form-row">
          <label>Nombre del producto</label>
          <input type="text" placeholder="Ej: Cable USB-C 2m" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Categoría</label>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            {cats.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label>Cantidad inicial</label>
          <input type="number" placeholder="0" min={0} value={qty} onChange={(e) => setQty(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Stock mínimo</label>
          <input type="number" placeholder="0" min={0} value={min} onChange={(e) => setMin(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Precio unitario ($)</label>
          <input type="number" placeholder="0.00" min={0} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Proveedor</label>
          <input type="text" placeholder="Nombre del proveedor" value={prov} onChange={(e) => setProv(e.target.value)} />
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn" onClick={onClose}>Cancelar</button>
        <button className="btn primary" onClick={handleSubmit}>
          <IconCheck size={14} stroke={2} /> Registrar
        </button>
      </div>
    </Modal>
  );
}
