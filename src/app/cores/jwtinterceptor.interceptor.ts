import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthenticationService } from '../services/auth-services/authentication.service';

export const jwtinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = ['/api/Auth/authenticate', '/api.ipify.org']; // Replace with your actual login URL

const getPathFromUrl = (url) => {
    const urlObj = new URL(url);
    return urlObj.pathname + urlObj.search; // Include both pathname and search
};

const requestPath = getPathFromUrl(req.url);
const isExcludedUrl = excludedUrls.some((url) => requestPath.startsWith(url) || requestPath.includes(url));

  if (!isExcludedUrl) {
    const d = new AuthenticationService();
    const authToken = d.CurrentUserValue.token;
    if (authToken) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });
      return next(authReq);
    }
  }
  return next(req);
};
