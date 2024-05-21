export const menuDate = '20 Mayo - 24 Mayo';

export const links = [
  [
    {
      label: 'Inicio',
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: 'Nuestros planes',
      icon: 'i-heroicons-list-bullet-20-solid',
      to: '/nuestros-planes',
    },
    {
      label: 'Menú',
      icon: 'i-heroicons-newspaper',
      to: '/menu',
    },
  ],
];

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

export function indexPlans(index: number) {
  if (index === 1) return 'Desayuno';
  if (index === 2) return 'Comida';
  if (index === 3) return 'Cena';
  if (index === 4) return 'Todos';
}
