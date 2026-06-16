import { useState } from 'react';
import { IconTruck, IconCheck } from '@tabler/icons-react';
import Modal from '../ui/Modal.jsx';

const transOptions = ['TurBus Cargo', 'Chilexpress', 'StarKen', 'DHL Express', 'FleetCo', 'Correos Chile'];

export default function NewDispatchModal({ open, onClose, onSubmit }) {
  const [dest, setDest] = useState('');
  const [trans, setTrans] = useState(transOptions[0]);
  const [prod, setProd] = useState('');
  const [sal, setSal] = useState('');
  const [est, setEst] = useState('');
  const [peso, setPeso] = useState('');

  const handleSubmit = () => {
    const d = dest.trim();
    if (!d) { alert('Ingresa el destino'); return; }
    onSubmit({
      dest: d,
      trans,
      prod: prod || 'Carga general',
      sal: sal || new Date().toISOString().slice(0, 10),
      est: est || '—',
      status: 'En bodega',
    });
    setDest('');
    setProd('');
    setSal('');
    setEst('');
    setPeso('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Registrar despacho" icon={IconTruck}>
      <div className="form-grid">
        <div className="form-row">
          <label>Destino</label>
          <input type="text" placeholder="Ciudad o dirección" value={dest} onChange={(e) => setDest(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Transportista</label>
          <select value={trans} onChange={(e) => setTrans(e.target.value)}>
            {transOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label>Productos</label>
          <input type="text" placeholder="Descripción de carga" value={prod} onChange={(e) => setProd(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Fecha de salida</label>
          <input type="date" value={sal} onChange={(e) => setSal(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Entrega estimada</label>
          <input type="date" value={est} onChange={(e) => setEst(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Peso (kg)</label>
          <input type="number" placeholder="0" min={0} value={peso} onChange={(e) => setPeso(e.target.value)} />
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
