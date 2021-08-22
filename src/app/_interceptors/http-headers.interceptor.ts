import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // clone all api requests and add host,key with the headers of the request
    request = request.clone({
      setHeaders: {
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
        'x-rapidapi-key': 'f62aa41078mshf6339a52b37510cp1de2d7jsnde28187c07da'
      },
      setParams: {
        key: '75887e5ff5ef4980a1a4f138233371a5'
      }
    });
    return next.handle(request);
  }
}
