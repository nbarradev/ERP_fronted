import { useState, useEffect } from 'react';
import { IconShoppingCart, IconCheck, IconPlus } from '@tabler/icons-react';
import Modal from '../ui/Modal.jsx';

// onSubmit contract (Option A):
//   { isNewProduct: boolean, productData?: { nombre, cat, min }, orderData: { prodId, prov, qty, precio, fecha, cat, obs } }
// When isNewProduct is true, productData is required and orderData.prodId is null.

const cats = ['Electrónica', 'Herramientas', 'Insumos', 'Maquinaria', 'Químicos', 'Textil'];

export default function NewOrderModal({ open, onClose, onSubmit, productos }) {
  const [prov, setProv] = useState('');
  const [prodId, setProdId] = useState('');
  const [qty, setQty] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');
  const [cat, setCat] = useState(cats[0]);
  const [obs, setObs] = useState('');

  const [newNombre, setNewNombre] = useState('');
  const [newCat, setNewCat] = useState(cats[0]);
  const [newMin, setNewMin] = useState(1);

  const selectedProduct = productos.find((p) => p.id === prodId);
  const isExistingProduct = prodId && prodId !== '__new__';
  const isNewProduct = prodId === '__new__';
  const newProductValid = isNewProduct && newNombre.trim() && newCat && parseInt(newMin) >= 1;
  const canSubmit = prov.trim() && (isExistingProduct || newProductValid) && parseInt(qty) > 0 && parseFloat(precio) > 0;

  useEffect(() => {
    if (prodId !== '__new__') {
      setNewNombre('');
      setNewCat(cats[0]);
      setNewMin(1);
    }
  }, [prodId]);

  const handleSubmit = () => {
    if (!canSubmit) {
      alert('Completa todos los campos obligatorios');
      return;
    }
    onSubmit({
      isNewProduct,
      productData: isNewProduct ? { nombre: newNombre.trim(), cat: newCat, min: parseInt(newMin) } : undefined,
      orderData: {
        prodId: isExistingProduct ? prodId : null,
        prov: prov.trim(),
        qty: parseInt(qty),
        precio: parseFloat(precio),
        fecha: fecha || new Date().toISOString().slice(0, 10),
        cat,
        obs,
      },
    });
    setProv('');
    setProdId('');
    setQty('');
    setPrecio('');
    setFecha('');
    setCat(cats[0]);
    setObs('');
    setNewNombre('');
    setNewCat(cats[0]);
    setNewMin(1);
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
          <select value={prodId} onChange={(e) => setProdId(e.target.value)}>
            <option value="">Selecciona un producto...</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} (stock: {p.qty} uds)
              </option>
            ))}
            <optgroup label="— o crear nuevo —">
              <option value="__new__">
                <IconPlus size={14} stroke={2} /> Crear producto nuevo...
              </option>
            </optgroup>
          </select>
          {selectedProduct && (
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              Stock actual: {selectedProduct.qty} uds
            </div>
          )}
        </div>
        {isNewProduct && (
          <>
            <div className="form-row">
              <label>Nombre del producto</label>
              <input type="text" placeholder="Nombre del nuevo producto" value={newNombre} onChange={(e) => setNewNombre(e.target.value)} required />
            </div>
            <div className="form-row">
              <label>Categoría</label>
              <select value={newCat} onChange={(e) => setNewCat(e.target.value)} required>
                {cats.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label>Stock mínimo</label>
              <input type="number" min={1} placeholder="0" value={newMin} onChange={(e) => setNewMin(e.target.value)} required />
            </div>
            <div className="form-row">
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                Stock actual del nuevo producto: 0 uds
              </div>
            </div>
          </>
        )}
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
        <button className="btn primary" onClick={handleSubmit} disabled={!canSubmit}>
          <IconCheck size={14} stroke={2} /> Crear orden
        </button>
      </div>
    </Modal>
  );
}
