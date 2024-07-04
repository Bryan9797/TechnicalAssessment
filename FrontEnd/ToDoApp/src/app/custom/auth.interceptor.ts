import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.indexOf("index") > 0)  return next(req);

  const token = localStorage.getItem("token");
  const newRequest = req.clone({
      setHeaders:{
            Authorization: `Bearer ${token}`
      }
  })
  return next(newRequest);
};
