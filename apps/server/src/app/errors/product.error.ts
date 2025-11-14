export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Product with id "${id}" not found.`);
    this.name = 'ProductNotFoundError';
  }
}

export class ProductCreateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductCreateError';
  }
}

export class ProductUpdateError extends Error {
  constructor(id: string, message: string) {
    super(`Failed to update product with id "${id}": ${message}`);
    this.name = 'ProductUpdateError';
  }
}