import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';

@Component({
  templateUrl: 'device-motion.page.html',
})
export class DeviceMotionPage {
  data: any;
  subscription: any;
  constructor(private deviceMotion: DeviceMotion) {

  }

  startWatching() {
    const options: DeviceMotionAccelerometerOptions = {
      frequency: 500
    }
    this.subscription = this.deviceMotion.watchAcceleration(options).subscribe(
      (acceleration: DeviceMotionAccelerationData) => {
        this.data = acceleration;
      },
      (error: any) => console.log(error)
    );

  }

  stopWatching() {
    this.subscription.unsubscribe();
  }
}
