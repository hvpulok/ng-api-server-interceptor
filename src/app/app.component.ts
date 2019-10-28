import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-api-server-interceptor-demo';
  subtitle = `${environment['apiServer']}`;
  dataFromServer$ = this.http.get('/todos/1');

  constructor(private http: HttpClient) { }
}
