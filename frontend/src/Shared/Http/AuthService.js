import Config from 'Config';
import RequestAuthorizationMiddleware from './Middlewares/RequestAuthMiddleware';
import ResponseCheckMiddleware from './Middlewares/ResponseCheckMiddleware';
import { BaseService } from './BaseService';

class AuthService extends BaseService {
  constructor() {
    super(Config.AUTH_API);

    this.reqeustAuthMiddleware = this.http.interceptors.request.use(
      RequestAuthorizationMiddleware,
    );

    this.responseMiddleware = this.http.interceptors.response.use(
      ResponseCheckMiddleware,
    );
  }
}

const authService = new AuthService();

export { authService };
