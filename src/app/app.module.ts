import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgApiServerInterceptor } from '@muminlife/ng-api-server-interceptor';

export function ngApiServerInterceptorFactory() {
  return new NgApiServerInterceptor(environment['apiServer']);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: ngApiServerInterceptorFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
