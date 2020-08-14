/// <reference lib="webworker" />

import * as geoPackage from '@ngageoint/geopackage';
addEventListener('message', ({ data }) => {
  geoPackage.GeoPackageAPI.open(data).then(database => { // Throws Uncaught ReferenceError: Buffer is not defined
    postMessage('worker done');
  });
});
