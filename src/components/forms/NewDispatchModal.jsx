import { useState } from 'react';
import { IconTruck, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import Modal from '../ui/Modal.jsx';

const transOptions = ['TurBus Cargo', 'Chilexpress', 'StarKen', 'DHL Express', 'FleetCo', 'Correos Chile'];

export default function NewDispatchModal({ open, onClose, onSubmit }) {
  const [dest, setDest] = useState('');
  const [trans, setTrans] = useState(transOptions[0]);
  const [prod, setProd] = useState('');
  const [sal, setSal] = useState('');
  const [est, setEst] = useState('');
  const [peso, setPeso] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const errs = {};
    if (!dest.trim()) errs.dest = 'El destino es obligatorio';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onSubmit({
      dest: dest.trim(),
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

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Registrar despacho" icon={IconTruck}>
      <div className="form-grid">
        <div className="form-row">
          <label>Destino</label>
          <input type="text" placeholder="Ciudad o dirección" value={dest} onChange={(e) => setDest(e.target.value)} className={errors.dest ? 'input-error' : ''} />
          {errors.dest && <span className="field-error"><IconAlertCircle size={12} stroke={2} />{errors.dest}</span>}
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
        <button className="btn" onClick={handleClose}>Cancelar</button>
        <button className="btn primary" onClick={handleSubmit}>
          <IconCheck size={14} stroke={2} /> Registrar
        </button>
      </div>
    </Modal>
  );
}
