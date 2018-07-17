import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
declare var window: any;


@Component({
  templateUrl: 'barcode-scanner.page.html',
})
export class BarcodeScannerPage {
  results: any;
  constructor(private barcodeScanner: BarcodeScanner) {

  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.results = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  reset() {
    this.results = null;
  }

  lookup() {
    window.open(`http://www.upcindex.com/${this.results.text}`, '_system');
  }
}
