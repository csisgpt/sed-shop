export const useCurrency = () => {
  const formatter = new Intl.NumberFormat('fa-IR', {
    currency: 'IRR',
    style: 'currency',
    maximumFractionDigits: 0
  })
  const format = (value: number) => formatter.format(value)
  return { format }
}
