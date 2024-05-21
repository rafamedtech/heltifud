export function weekdayTransformer(day: string) {
  if (day === 'MONDAY') return 'Lunes';
  if (day === 'TUESDAY') return 'Martes';
  if (day === 'WEDNESDAY') return 'Miércoles';
  if (day === 'THURSDAY') return 'Jueves';
  if (day === 'FRIDAY') return 'Viernes';
  return day;
}
