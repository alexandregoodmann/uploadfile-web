import { Component } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'uploadfile-web';

  constructor(
    private loaderService: LoaderService
  ) {

  }
  get loader() {
    return this.loaderService;
  }
}
