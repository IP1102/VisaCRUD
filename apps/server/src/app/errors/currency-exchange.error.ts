export class ConvertCurrencyError extends Error {
  constructor(from: string, to: string, message: string) {
    super(`Failed to convert currency from "${from}" to "${to}": ${message}`);
    this.name = 'ConvertCurrencyError';
  }
}