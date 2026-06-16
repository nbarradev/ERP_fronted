import { IconCheck, IconAlertTriangle, IconClock, IconX, IconPackages, IconTruck, IconCircleCheck } from '@tabler/icons-react';

const statusMeta = {
  ok: { color: 'green', label: 'Stock OK', Icon: IconCheck },
  low: { color: 'red', label: 'Bajo stock', Icon: IconAlertTriangle },
  Pendiente: { color: 'amber', label: 'Pendiente', Icon: IconClock },
  Aprobado: { color: 'green', label: 'Aprobado', Icon: IconCheck },
  Rechazado: { color: 'red', label: 'Rechazado', Icon: IconX },
  'En bodega': { color: 'amber', label: 'En bodega', Icon: IconPackages },
  'En tránsito': { color: 'purple', label: 'En tránsito', Icon: IconTruck },
  Entregado: { color: 'green', label: 'Entregado', Icon: IconCircleCheck },
};

export default function StatusPill({ status }) {
  const meta = statusMeta[status] || { color: 'gray', label: status, Icon: IconCheck };
  const { color, label, Icon } = meta;
  return (
    <span className={`pill ${color}`}>
      <Icon size={12} stroke={2.5} />
      {label}
    </span>
  );
}
