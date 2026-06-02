import { formatRelativeDate } from './date';

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function monthsAgo(months: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString();
}

function yearsAgo(years: number): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString();
}

describe('formatRelativeDate', () => {
  it('retorna string para uma data recente', () => {
    const result = formatRelativeDate(daysAgo(3));
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('usa unidade de dias para datas com menos de 30 dias', () => {
    const result = formatRelativeDate(daysAgo(5));
    expect(result).toMatch(/dia/);
  });

  it('usa unidade de meses para datas entre 30 e 365 dias', () => {
    const result = formatRelativeDate(monthsAgo(3));
    expect(result).toMatch(/mês|meses/);
  });

  it('usa unidade de anos para datas com mais de 365 dias', () => {
    const result = formatRelativeDate(yearsAgo(2));
    expect(result).toMatch(/ano/);
  });

  it('retorna "hoje" para a data atual', () => {
    const result = formatRelativeDate(new Date().toISOString());
    expect(result).toBe('hoje');
  });
});
