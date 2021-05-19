import Config from 'Config';
import {
  successCheck,
  errorCheck,
} from './Middlewares/ResponseCheckMiddleware';
import RequestAuthMiddleware from './Middlewares/RequestAuthMiddleware';
import { BaseService } from './BaseService';

class ProductService extends BaseService {
  constructor() {
    super(Config.PRODUCT_API);

    this.responseMiddleware = this.http.interceptors.response.use(
      successCheck,
      errorCheck,
    );

    this.requestMiddleware = this.http.interceptors.request.use(
      RequestAuthMiddleware,
    );
  }
}

const productService = new ProductService();

export { productService };
