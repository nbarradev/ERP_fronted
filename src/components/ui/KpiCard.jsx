import { IconPackages, IconAlertTriangle, IconCurrencyDollar, IconCategory, IconFileInvoice, IconClock, IconCheck, IconX, IconTruck, IconRoad, IconCircleCheck } from '@tabler/icons-react';

const iconMap = {
  packages: IconPackages,
  'alert-triangle': IconAlertTriangle,
  'currency-dollar': IconCurrencyDollar,
  category: IconCategory,
  'file-invoice': IconFileInvoice,
  clock: IconClock,
  check: IconCheck,
  x: IconX,
  truck: IconTruck,
  road: IconRoad,
  'circle-check': IconCircleCheck,
};

export default function KpiCard({ icon, iconColor, label, value, sub }) {
  const Icon = iconMap[icon] || IconPackages;
  return (
    <div className="kpi">
      <div className="kpi-label">
        <div className={`kpi-icon ${iconColor}`}>
          <Icon size={16} stroke={2} />
        </div>
        {label}
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-sub">{sub}</div>
    </div>
  );
}
