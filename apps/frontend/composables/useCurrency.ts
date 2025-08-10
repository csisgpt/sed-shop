import { formatIRR } from '~/utils/currency'

export function useCurrency() {
  const format = (value: number | string) => formatIRR(value)
  return { format }
}
