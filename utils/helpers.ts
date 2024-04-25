export const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const expenseOptions = ['Todas', 'Gasto', 'Ingreso'];

export const monthOptions = [
  'Todos',
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const background =
  'https://res.cloudinary.com/rafamed-dev/image/upload/v1714075109/heltifud/background_xxcijf.jpg';

export const menuDate = '29 Abril - 3 Mayo';

export function transformPrice(item: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(item);
}

export function indexName(index: number) {
  if (index === 1) return 'Lun';
  if (index === 2) return 'Mar';
  if (index === 3) return 'Mie';
  if (index === 4) return 'Jue';
  if (index === 5) return 'Vie';
}
