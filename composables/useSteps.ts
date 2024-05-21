import { Modal } from '#components';
import step1 from '@/assets/img/step1.svg';
import step2 from '@/assets/img/step2.svg';
import step3 from '@/assets/img/step3.svg';
import step4 from '@/assets/img/step4.svg';

export function useSteps() {
  const modal = useModal();
  const steps = [
    {
      title: 'Elige tu plan',
      description: 'Selecciona el plan que más se ajuste a tus necesidades.',
      button: {
        label: 'Ver planes',
        icon: 'i-heroicons-list-bullet-20-solid',
        click: () => modal.open(Modal, { title: 'Nuestros planes', description: '', type: 'plans' }),
      },
      image: step1,
    },
    {
      title: 'Realiza tu pedido',
      description: 'Realiza tu pedido a través de WhatsApp.',
      button: {
        label: '¡Ordenar ahora!',
        icon: 'i-heroicons-rocket-launch',
        click: () => navigateTo('https://wa.me/c/5216648161284', { external: true }),
      },
      image: step2,
    },
    {
      title: 'Confirma tu menú',
      description: 'Confirma o personaliza tu pedido.',
      button: {
        label: 'Menú de la semana',
        icon: 'i-heroicons-newspaper',
        click: () => navigateTo('/menu'),
      },
      image: step3,
    },
    {
      title: 'Recibe tus comidas',
      description: 'Recibe tus comidas en la comodidad de tu hogar.',
      button: {
        label: 'Sobre las entregas',
        icon: 'i-heroicons-information-circle',
        click: () =>
          modal.open(Modal, {
            title: 'Sobre las entregas',
            description:
              'Las entregas se realizan el Domingo en la tarde o el Lunes en la mañana para los primeros 3 días de la semana y si se elige alguna opción de 5 días, la entrega del resto se realizaría el día Miércoles en la tarde o el Jueves en la mañana.',
            type: 'delivery',
          }),
      },
      image: step4,
    },
  ];
  return { steps };
}
