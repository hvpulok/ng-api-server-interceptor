# NgApiServerInterceptor

## Install
```bash
$ npm install -S @muminlife/ng-api-server-interceptor
```

## Purpose
This is an angular HTTP interceptor. It's purpose is to intercept HTTP client api calls and redirect to defined api server in environment.ts file. The benefit of this interceptor is you can customize your api server based on environment which is particularly helpful for mocking or server redirection.

## Usage

```js
// src/environments/environment.ts
// similarly in other environment.*.ts files based on your requirement
export const environment = {
  production: false,
  apiServer: 'http://www.mock-server.com'
};
```

```js
// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgApiServerInterceptor } from '@muminlife/ng-api-server-interceptor';
import { environment } from '../environments/environment';

export function ngApiServerInterceptorFactory() {
  return new NgApiServerInterceptor(environment['apiServer']);
}

@NgModule({
  declarations: [
    AppComponent
    // ...
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    // ...
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: ngApiServerInterceptorFactory,
      multi: true
    }
    // ....
  ],
})
export class AppModule { }
```

## Expected behavior as per above config:
- When you do api call through HttpClient with url `/api/users`, the interceptor will prepend the apiServer url and make the call as `http://www.mock-server.com/api/users`
- The interceptor excludes any api call started with `http://` or `https://`. ex. `http://fonts.google.com/abcd`
- The interceptor excludes any api call that has `/assets/` string in url. example: `/assests/i18n/en.json`