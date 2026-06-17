import { useState, useEffect } from 'react';
import { IconEdit, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import Modal from '../ui/Modal.jsx';

export default function EditProductModal({ open, onClose, product, onSubmit }) {
  const [qty, setQty] = useState('');
  const [precio, setPrecio] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setQty(product.qty);
      setPrecio(product.precio);
      setErrors({});
    }
  }, [product]);

  const handleSubmit = () => {
    if (!product) return;
    const errs = {};
    if (!qty || parseInt(qty) < 0) errs.qty = 'Ingresa una cantidad válida';
    if (!precio || parseFloat(precio) < 0) errs.precio = 'Ingresa un precio válido';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onSubmit({
      id: product.id,
      qty: parseInt(qty) || 0,
      precio: parseFloat(precio) || 0,
    });
    onClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Actualizar stock" icon={IconEdit}>
      <div className="form-row">
        <label>Producto</label>
        <input type="text" readOnly style={{ opacity: 0.6 }} value={product?.nombre || ''} />
      </div>
      <div className="form-grid">
        <div className="form-row">
          <label>Nueva cantidad</label>
          <input type="number" min={0} value={qty} onChange={(e) => setQty(e.target.value)} className={errors.qty ? 'input-error' : ''} />
          {errors.qty && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.qty}</span>}
        </div>
        <div className="form-row">
          <label>Nuevo precio ($)</label>
          <input type="number" min={0} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value)} className={errors.precio ? 'input-error' : ''} />
          {errors.precio && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.precio}</span>}
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn" onClick={handleClose}>Cancelar</button>
        <button className="btn primary" onClick={handleSubmit}>
          <IconCheck size={14} stroke={2} /> Guardar cambios
        </button>
      </div>
    </Modal>
  );
}
