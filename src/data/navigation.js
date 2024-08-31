import {  ChartPieIcon, ClipboardDocumentListIcon, VideoCameraIcon, BuildingOffice2Icon, TruckIcon, UsersIcon, UserIcon, UserGroupIcon, EnvelopeIcon, TableCellsIcon, ClipboardIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Apartamentos', href: 'apartamentos', icon: BuildingOffice2Icon, current: false },
  { name: 'Vehiculos', href: 'vehiculos', icon: TruckIcon, current: false },  // Representa vehículos
  { name: 'Residentes', href: 'residentes', icon: UserIcon, current: false },
  { name: 'Visitantes', href: 'visitantes', icon: UsersIcon, current: false },  // Representa grupos de personas
  { name: 'Domiciliarios', href: 'domiciliarios', icon: UserGroupIcon, current: false },  // Representa validación o gestión
  { name: 'Empleados', href: 'empleados', icon: ClipboardIcon, current: false },
  { name: 'Parqueaderos', href: 'parqueaderos', icon: TableCellsIcon, current: false },  // Representa almacenamiento o gestión de espacio
  { name: 'Correspondencia', href: 'correspondencia', icon: EnvelopeIcon, current: false },  // Representa bandeja de entrada

  { name: 'Reports', href: 'reports', icon: ClipboardDocumentListIcon, current: false },
  { name: 'Dashboard', href: 'Dashboard', icon: ChartPieIcon, current: false },
  { name: 'Live', href: 'live', icon: VideoCameraIcon, current: false },  // Representa transmisión en vivo o monitoreo
];

export const teams = [
  { name: 'Formularios', href: 'formularios', initial: 'A' },
  { name: 'Seguridad', href: 'team-b', initial: 'B' },
  { name: 'Admin', href: 'team-c', initial: 'C' },

  // Agrega más equipos aquí
];

export const settings = [
  { name: 'Settings', href: 'settings', icon: Cog6ToothIcon, current: true },

];