export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return cpf;
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function unformatCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function unformatCurrency(value: string): string {
  return value.replace(/\D/g, '');
}

export function parseCurrency(value: string): number {
  const cleaned = unformatCurrency(value);
  if (!cleaned) return 0;
  return parseFloat(cleaned) / 100;
}

export function validateCPF(cpf: string): boolean {
  const cleaned = unformatCPF(cpf);
  return cleaned.length === 11;
}

