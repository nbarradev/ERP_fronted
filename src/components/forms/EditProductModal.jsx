import { useState, useEffect } from 'react';
import { IconEdit, IconCheck } from '@tabler/icons-react';
import Modal from '../ui/Modal.jsx';

export default function EditProductModal({ open, onClose, product, onSubmit }) {
  const [qty, setQty] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    if (product) {
      setQty(product.qty);
      setPrecio(product.precio);
    }
  }, [product]);

  const handleSubmit = () => {
    if (!product) return;
    onSubmit({
      id: product.id,
      qty: parseInt(qty) || 0,
      precio: parseFloat(precio) || 0,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Actualizar stock" icon={IconEdit}>
      <div className="form-row">
        <label>Producto</label>
        <input type="text" readOnly style={{ opacity: 0.6 }} value={product?.nombre || ''} />
      </div>
      <div className="form-grid">
        <div className="form-row">
          <label>Nueva cantidad</label>
          <input type="number" min={0} value={qty} onChange={(e) => setQty(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Nuevo precio ($)</label>
          <input type="number" min={0} step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn" onClick={onClose}>Cancelar</button>
        <button className="btn primary" onClick={handleSubmit}>
          <IconCheck size={14} stroke={2} /> Guardar cambios
        </button>
      </div>
    </Modal>
  );
}
