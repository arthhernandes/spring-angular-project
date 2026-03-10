import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: 'Basic ' + btoa('arthurito:motinha')
      }
    });
    return next(authReq);
  }

  return next(req);
};