import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const ticketUrl = ref('');

  const breakfastQty = ref('');
  const lunchQty = ref('');
  const dinnerQty = ref('');

  return { ticketUrl, breakfastQty, lunchQty, dinnerQty };
});
