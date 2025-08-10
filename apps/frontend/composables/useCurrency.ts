export const useCurrency = (amount: number) =>
  new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
  }).format(amount);
