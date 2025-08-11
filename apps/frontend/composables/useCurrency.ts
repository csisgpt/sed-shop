export function useCurrency(amount: number | string | null | undefined) {
  const n = typeof amount === 'string' ? Number(amount) : amount ?? 0
  return new Intl.NumberFormat('fa-IR', { style: 'currency', currency: 'IRR', maximumFractionDigits: 0 }).format(n)
}
