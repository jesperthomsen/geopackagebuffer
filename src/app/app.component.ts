import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as geoPackage from '@ngageoint/geopackage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _client: HttpClient) { }
  title = 'GeoPackBufferProblem';

  public thisWorks() {
      this._client.get('/assets/geopackage/LedningsData.gpkg', { responseType: 'arraybuffer'}).subscribe(response => {
        const byteArray = new Uint8Array(response);
        console.log('got data');
        geoPackage.GeoPackageAPI.open(byteArray).then(database => {
          console.log('got db');
        });
    });

  }

  public notWorking(): void {
    const worker: Worker = new Worker('./../app/worker.worker.ts', { type: 'module' });

    worker.onmessage = event => {
      // Never happens
      console.log('Got message', event);
    };
    this._client.get('/assets/geopackage/LedningsData.gpkg', { responseType: 'arraybuffer'}).subscribe(response => {
      const byteArray = new Uint8Array(response);
      worker.postMessage(response);

    });

  }

}

