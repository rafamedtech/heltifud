import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const ticketUrl = ref('');

  return { ticketUrl };
});
