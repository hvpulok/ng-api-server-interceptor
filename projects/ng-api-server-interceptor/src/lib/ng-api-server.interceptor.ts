import { Injectable, Optional, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable, from } from 'rxjs';

@Injectable()
export class NgApiServerInterceptor implements HttpInterceptor {
  excludedPathsWithString: string[] = ['/assets/'];

  constructor(@Optional() @Inject('API_SERVER') private apiServer: string) {
    if (this.apiServer) {
      console.info('[NgApiServerInterceptor] enabled with apiServer: ', this.apiServer);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq;

    if (this.apiServer && req.url.indexOf('http://') < 0 && req.url.indexOf('https://') < 0) {
      if (this._isExcluded(req.url)) {
        newReq = req.clone();
        console.info('[NgApiServerInterceptor] not using api server due to excludedPathsWithString - ', req.url);
      } else {
        const newUrl = Location.joinWithSlash(this.apiServer, req.url);
        newReq = req.clone({ url: newUrl });
        console.info('[NgApiServerInterceptor] req.url', req.url);
      }

    } else {
      newReq = req.clone();
    }
    return next.handle(newReq);
  }

  private _isExcluded(url: string): boolean {
    return this.excludedPathsWithString.some(item => url.indexOf(item) >= 0);
  }
}
