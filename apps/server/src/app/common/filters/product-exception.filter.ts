import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ProductNotFoundError, ProductCreateError, ProductUpdateError } from '../../errors/product.error';
import { ConvertCurrencyError } from '../../errors/currency-exchange.error';

@Catch(ProductNotFoundError, ProductCreateError, ProductUpdateError, ConvertCurrencyError)
export class ProductExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof ProductNotFoundError) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof ProductCreateError || exception instanceof ProductUpdateError) {
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
    });
  }
}
