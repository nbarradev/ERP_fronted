export const productos = [
  { id: 'PRD-001', nombre: 'Cable USB-C 2m', cat: 'Electrónica', qty: 145, min: 30, precio: 4990, prov: 'TechDistrib Ltda.' },
  { id: 'PRD-002', nombre: 'Teclado mecánico RGB', cat: 'Electrónica', qty: 18, min: 25, precio: 49990, prov: 'TechDistrib Ltda.' },
  { id: 'PRD-003', nombre: 'Taladro percutor 800W', cat: 'Herramientas', qty: 34, min: 10, precio: 89990, prov: 'Ferretería Central' },
  { id: 'PRD-004', nombre: 'Guantes de nitrilo (caja)', cat: 'Insumos', qty: 8, min: 20, precio: 6990, prov: 'SafeWork Chile' },
  { id: 'PRD-005', nombre: 'Compresor 50L 2HP', cat: 'Maquinaria', qty: 12, min: 5, precio: 249990, prov: 'MaquiPro S.A.' },
  { id: 'PRD-006', nombre: 'Solvente industrial 5L', cat: 'Químicos', qty: 55, min: 15, precio: 12990, prov: 'QuímiCorp Ltda.' },
  { id: 'PRD-007', nombre: 'Cinta aislante (rollo)', cat: 'Insumos', qty: 3, min: 10, precio: 1290, prov: 'Ferretería Central' },
  { id: 'PRD-008', nombre: 'Overol talla L', cat: 'Textil', qty: 42, min: 10, precio: 19990, prov: 'UniformesPro' },
  { id: 'PRD-009', nombre: 'Monitor 24" FHD', cat: 'Electrónica', qty: 27, min: 8, precio: 169990, prov: 'TechDistrib Ltda.' },
  { id: 'PRD-010', nombre: 'Destornillador eléctrico', cat: 'Herramientas', qty: 6, min: 8, precio: 34990, prov: 'Ferretería Central' },
  { id: 'PRD-011', nombre: 'Aceite hidráulico 20L', cat: 'Químicos', qty: 30, min: 10, precio: 28990, prov: 'QuímiCorp Ltda.' },
  { id: 'PRD-012', nombre: 'Casco seguridad ANSI', cat: 'Insumos', qty: 75, min: 20, precio: 8990, prov: 'SafeWork Chile' },
];

export const ordenes = [
  { id: 'OC-2024-001', prov: 'TechDistrib Ltda.', prod: 'Teclados mecánicos RGB x20', qty: 20, monto: 999800, fecha: '2024-06-01', status: 'Aprobado' },
  { id: 'OC-2024-002', prov: 'SafeWork Chile', prod: 'Guantes nitrilo x50 cajas', qty: 50, monto: 349500, fecha: '2024-06-03', status: 'Pendiente' },
  { id: 'OC-2024-003', prov: 'Ferretería Central', prod: 'Cinta aislante x30 rollos', qty: 30, monto: 38700, fecha: '2024-06-05', status: 'Pendiente' },
  { id: 'OC-2024-004', prov: 'MaquiPro S.A.', prod: 'Compresor 50L x2', qty: 2, monto: 499980, fecha: '2024-06-07', status: 'Aprobado' },
  { id: 'OC-2024-005', prov: 'QuímiCorp Ltda.', prod: 'Solvente industrial 5L x10', qty: 10, monto: 129900, fecha: '2024-06-10', status: 'Rechazado' },
  { id: 'OC-2024-006', prov: 'UniformesPro', prod: 'Overoles talla L x15', qty: 15, monto: 299850, fecha: '2024-06-12', status: 'Pendiente' },
  { id: 'OC-2024-007', prov: 'TechDistrib Ltda.', prod: 'Monitores 24" x5', qty: 5, monto: 849950, fecha: '2024-06-14', status: 'Aprobado' },
  { id: 'OC-2024-008', prov: 'SafeWork Chile', prod: 'Cascos seguridad x30', qty: 30, monto: 269700, fecha: '2024-06-15', status: 'Pendiente' },
];

export const despachos = [
  { id: 'DSP-001', dest: 'Santiago Centro', trans: 'Chilexpress', prod: 'Cable USB-C x50 / Teclados x10', sal: '2024-06-01', est: '2024-06-03', status: 'Entregado' },
  { id: 'DSP-002', dest: 'Valparaíso', trans: 'TurBus Cargo', prod: 'Compresores x4 / Taladros x6', sal: '2024-06-05', est: '2024-06-07', status: 'En tránsito' },
  { id: 'DSP-003', dest: 'Concepción', trans: 'StarKen', prod: 'Overoles x20 / Cascos x25', sal: '2024-06-08', est: '2024-06-11', status: 'En tránsito' },
  { id: 'DSP-004', dest: 'Antofagasta', trans: 'DHL Express', prod: 'Solvente industrial x8', sal: '2024-06-10', est: '2024-06-14', status: 'En bodega' },
  { id: 'DSP-005', dest: 'La Serena', trans: 'FleetCo', prod: 'Monitores 24" x3', sal: '2024-06-12', est: '2024-06-14', status: 'Entregado' },
  { id: 'DSP-006', dest: 'Puerto Montt', trans: 'Correos Chile', prod: 'Guantes nitrilo x30 cajas', sal: '2024-06-13', est: '2024-06-18', status: 'En bodega' },
  { id: 'DSP-007', dest: 'Temuco', trans: 'StarKen', prod: 'Aceite hidráulico x10', sal: '2024-06-14', est: '2024-06-16', status: 'En tránsito' },
  { id: 'DSP-008', dest: 'Arica', trans: 'DHL Express', prod: 'Destornilladores x8', sal: '2024-06-15', est: '2024-06-18', status: 'En bodega' },
];
