import Config from 'Config';
import {
  successCheck,
  errorCheck,
} from './Middlewares/ResponseCheckMiddleware';
import { BaseService } from './BaseService';

class AuthService extends BaseService {
  constructor() {
    super(Config.AUTH_API);

    this.responseMiddleware = this.http.interceptors.response.use(
      successCheck,
      errorCheck,
    );
  }
}

const authService = new AuthService();

export { authService };
