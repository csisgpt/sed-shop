export function formatIRR(value: number | string) {
  const num = typeof value === 'string' ? parseInt(value) : value
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    maximumFractionDigits: 0
  }).format(num)
}
