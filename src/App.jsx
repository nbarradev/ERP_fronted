import { useState, useEffect } from 'react';
import './styles/erp.css';
import Sidebar from './components/layout/Sidebar.jsx';
import Topbar from './components/layout/Topbar.jsx';
import InventorySection from './components/sections/InventorySection.jsx';
import OrdersSection from './components/sections/OrdersSection.jsx';
import DispatchSection from './components/sections/DispatchSection.jsx';
import Toast from './components/ui/Toast.jsx';
import NewProductModal from './components/forms/NewProductModal.jsx';
import EditProductModal from './components/forms/EditProductModal.jsx';
import NewOrderModal from './components/forms/NewOrderModal.jsx';
import NewDispatchModal from './components/forms/NewDispatchModal.jsx';
import { productos as seedProductos, ordenes as seedOrdenes, despachos as seedDespachos } from './data/seedData.js';

export default function App() {
  const [activeSection, setActiveSection] = useState('inv');

  const [productos, setProductos] = useState(seedProductos);
  const [ordenes, setOrdenes] = useState(seedOrdenes);
  const [despachos, setDespachos] = useState(seedDespachos);

  const [nextProdId, setNextProdId] = useState(13);
  const [nextOrdId, setNextOrdId] = useState(9);
  const [nextDesId, setNextDesId] = useState(9);

  const [toast, setToast] = useState({ message: '', visible: false });

  const [modalNewProd, setModalNewProd] = useState(false);
  const [modalEditProd, setModalEditProd] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [modalNewOrd, setModalNewOrd] = useState(false);
  const [modalNewDes, setModalNewDes] = useState(false);

  useEffect(() => {
    if (!toast.visible) return;
    const t = setTimeout(() => setToast({ message: '', visible: false }), 2500);
    return () => clearTimeout(t);
  }, [toast.visible]);

  const showToast = (msg) => setToast({ message: msg, visible: true });

  const addProduct = (data) => {
    const id = 'PRD-' + String(nextProdId).padStart(3, '0');
    setNextProdId((n) => n + 1);
    setProductos((prev) => [...prev, { id, ...data }]);
    showToast('Producto registrado correctamente');
  };

  const saveEditProduct = ({ id, qty, precio }) => {
    setProductos((prev) => prev.map((p) => (p.id === id ? { ...p, qty, precio } : p)));
    showToast('Stock actualizado correctamente');
  };

  const deleteProduct = (p) => {
    if (window.confirm('¿Eliminar ' + p.nombre + '?')) {
      setProductos((prev) => prev.filter((x) => x.id !== p.id));
      showToast('Producto eliminado');
    }
  };

  const addOrder = (payload) => {
    // payload: { isNewProduct, productData?, orderData }
    if (payload.isNewProduct) {
      const newProdId = 'PRD-' + String(nextProdId).padStart(3, '0');
      setNextProdId((n) => n + 1);
      const newProduct = {
        id: newProdId,
        qty: 0,
        precio: payload.orderData.precio,
        prov: payload.orderData.prov,
        ...payload.productData,
      };
      setProductos((prev) => [...prev, newProduct]);

      const newOrdId = 'OC-2024-' + String(nextOrdId).padStart(3, '0');
      setNextOrdId((n) => n + 1);
      const qty = parseInt(payload.orderData.qty) || 0;
      const precio = parseFloat(payload.orderData.precio) || 0;
      const monto = qty * precio;
      setOrdenes((prev) => [
        {
          id: newOrdId,
          prodId: newProdId,
          prov: payload.orderData.prov,
          prod: `${payload.productData.nombre} x${qty}`,
          qty,
          monto,
          fecha: payload.orderData.fecha || new Date().toISOString().slice(0, 10),
          status: 'Pendiente',
        },
        ...prev,
      ]);
      showToast('Producto creado y orden registrada');
    } else {
      const id = 'OC-2024-' + String(nextOrdId).padStart(3, '0');
      setNextOrdId((n) => n + 1);
      const producto = productos.find((p) => p.id === payload.orderData.prodId);
      const prodName = producto ? producto.nombre : (payload.orderData.prod || 'Producto desconocido');
      const qty = parseInt(payload.orderData.qty) || 0;
      const precio = parseFloat(payload.orderData.precio) || 0;
      const monto = qty * precio;
      setOrdenes((prev) => [
        {
          id,
          prodId: payload.orderData.prodId,
          prov: payload.orderData.prov,
          prod: `${prodName} x${qty}`,
          qty,
          monto,
          fecha: payload.orderData.fecha || new Date().toISOString().slice(0, 10),
          status: 'Pendiente',
        },
        ...prev,
      ]);
      showToast('Orden de compra creada');
    }
  };

  const setOrderStatus = (id, status) => {
    setOrdenes((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    showToast('Orden ' + status.toLowerCase() + ' correctamente');
  };

  const addDispatch = (data) => {
    const id = 'DSP-' + String(nextDesId).padStart(3, '0');
    setNextDesId((n) => n + 1);
    setDespachos((prev) => [{ id, ...data }, ...prev]);
    showToast('Despacho registrado correctamente');
  };

  const setDispatchStatus = (id, status) => {
    setDespachos((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    showToast('Estado actualizado: ' + status);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
      <h2 className="sr-only">Sistema ERP Logístico — módulos de inventario, órdenes de compra y despachos</h2>
      <Toast message={toast.message} visible={toast.visible} />
      <div className="erp-shell">
        <Sidebar activeSection={activeSection} onChangeSection={setActiveSection} />
        <div className="main">
          <Topbar activeSection={activeSection} />
          <div className="content">
            {activeSection === 'inv' && (
              <InventorySection
                productos={productos}
                onDelete={deleteProduct}
                onOpenEdit={(p) => { setEditProduct(p); setModalEditProd(true); }}
                onOpenNew={() => setModalNewProd(true)}
              />
            )}
            {activeSection === 'ord' && (
              <OrdersSection
                ordenes={ordenes}
                productos={productos}
                onStatusChange={setOrderStatus}
                onOpenNew={() => setModalNewOrd(true)}
              />
            )}
            {activeSection === 'des' && (
              <DispatchSection
                despachos={despachos}
                onStatusChange={setDispatchStatus}
                onOpenNew={() => setModalNewDes(true)}
              />
            )}
          </div>
        </div>
      </div>

      <NewProductModal open={modalNewProd} onClose={() => setModalNewProd(false)} onSubmit={addProduct} />
      <EditProductModal open={modalEditProd} onClose={() => setModalEditProd(false)} product={editProduct} onSubmit={saveEditProduct} />
      <NewOrderModal open={modalNewOrd} onClose={() => setModalNewOrd(false)} onSubmit={addOrder} productos={productos} />
      <NewDispatchModal open={modalNewDes} onClose={() => setModalNewDes(false)} onSubmit={addDispatch} />
    </div>
  );
}
