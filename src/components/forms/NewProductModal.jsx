import { useState } from 'react';
import { IconPlus, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import Modal from '../ui/Modal.jsx';

const cats = ['Electrónica', 'Herramientas', 'Insumos', 'Maquinaria', 'Químicos', 'Textil'];

export default function NewProductModal({ open, onClose, onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [cat, setCat] = useState(cats[0]);
  const [qty, setQty] = useState('');
  const [min, setMin] = useState('');
  const [precio, setPrecio] = useState('');
  const [prov, setProv] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const errs = {};
    if (!nombre.trim()) errs.nombre = 'El nombre del producto es obligatorio';
    if (!qty || parseInt(qty) < 0) errs.qty = 'Ingresa una cantidad válida';
    if (!min || parseInt(min) < 0) errs.min = 'Ingresa un stock mínimo válido';
    if (!precio || parseFloat(precio) < 0) errs.precio = 'Ingresa un precio válido';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onSubmit({
      nombre: nombre.trim(),
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

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Registrar producto" icon={IconPlus}>
      <div className="form-grid">
        <div className="form-row">
          <label>Nombre del producto</label>
          <input type="text" placeholder="Ej: Cable USB-C 2m" value={nombre} onChange={(e) => setNombre(e.target.value)} className={errors.nombre ? 'input-error' : ''} />
          {errors.nombre && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.nombre}</span>}
        </div>
        <div className="form-row">
          <label>Categoría</label>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            {cats.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label>Cantidad inicial</label>
          <input type="number" placeholder="0" min={0} value={qty} onChange={(e) => setQty(e.target.value)} className={errors.qty ? 'input-error' : ''} />
          {errors.qty && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.qty}</span>}
        </div>
        <div className="form-row">
          <label>Stock mínimo</label>
          <input type="number" placeholder="0" min={0} value={min} onChange={(e) => setMin(e.target.value)} className={errors.min ? 'input-error' : ''} />
          {errors.min && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.min}</span>}
        </div>
        <div className="form-row">
          <label>Precio unitario ($)</label>
          <input type="number" placeholder="0.00" min={0} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value)} className={errors.precio ? 'input-error' : ''} />
          {errors.precio && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.precio}</span>}
        </div>
        <div className="form-row">
          <label>Proveedor</label>
          <input type="text" placeholder="Nombre del proveedor" value={prov} onChange={(e) => setProv(e.target.value)} />
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn" onClick={handleClose}>Cancelar</button>
        <button className="btn primary" onClick={handleSubmit}>
          <IconCheck size={14} stroke={2} /> Registrar
        </button>
      </div>
    </Modal>
  );
}
