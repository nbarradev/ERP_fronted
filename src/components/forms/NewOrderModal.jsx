import { useState, useEffect } from 'react';
import { IconShoppingCart, IconCheck, IconPlus, IconAlertCircle } from '@tabler/icons-react';
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
  const [errors, setErrors] = useState({});

  const [newNombre, setNewNombre] = useState('');
  const [newCat, setNewCat] = useState(cats[0]);
  const [newMin, setNewMin] = useState(1);

  const selectedProduct = productos.find((p) => p.id === prodId);
  const isExistingProduct = prodId && prodId !== '__new__';
  const isNewProduct = prodId === '__new__';

  useEffect(() => {
    if (prodId !== '__new__') {
      setNewNombre('');
      setNewCat(cats[0]);
      setNewMin(1);
    }
  }, [prodId]);

  const handleSubmit = () => {
    const errs = {};
    if (!prov.trim()) errs.prov = 'El proveedor es obligatorio';
    if (!prodId) errs.prodId = 'Selecciona un producto';
    if (isNewProduct && !newNombre.trim()) errs.newNombre = 'El nombre del producto es obligatorio';
    if (!qty || parseInt(qty) <= 0) errs.qty = 'Ingresa una cantidad mayor a 0';
    if (!precio || parseFloat(precio) <= 0) errs.precio = 'Ingresa un precio mayor a 0';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
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

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Nueva orden de compra" icon={IconShoppingCart}>
      <div className="form-grid">
        <div className="form-row">
          <label>Proveedor</label>
          <input type="text" placeholder="Nombre del proveedor" value={prov} onChange={(e) => setProv(e.target.value)} className={errors.prov ? 'input-error' : ''} />
          {errors.prov && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.prov}</span>}
        </div>
        <div className="form-row">
          <label>Producto</label>
          <select value={prodId} onChange={(e) => setProdId(e.target.value)} className={errors.prodId ? 'input-error' : ''}>
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
          {errors.prodId && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.prodId}</span>}
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
              <input type="text" placeholder="Nombre del nuevo producto" value={newNombre} onChange={(e) => setNewNombre(e.target.value)} required className={errors.newNombre ? 'input-error' : ''} />
              {errors.newNombre && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.newNombre}</span>}
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
          <input type="number" placeholder="0" min={1} value={qty} onChange={(e) => setQty(e.target.value)} className={errors.qty ? 'input-error' : ''} />
          {errors.qty && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.qty}</span>}
        </div>
        <div className="form-row">
          <label>Precio unitario ($)</label>
          <input type="number" placeholder="0.00" step={0.01} value={precio} onChange={(e) => setPrecio(e.target.value)} className={errors.precio ? 'input-error' : ''} />
          {errors.precio && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.precio}</span>}
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
        <button className="btn" onClick={handleClose}>Cancelar</button>
        <button className="btn primary" onClick={handleSubmit}>
          <IconCheck size={14} stroke={2} /> Crear orden
        </button>
      </div>
    </Modal>
  );
}
