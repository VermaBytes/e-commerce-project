import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {

  show = false;
  message = '';
  type: 'success' | 'error' = 'success';

  showToast(msg: string, type: 'success' | 'error' = 'success') {
    this.message = msg;
    this.type = type;
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, 2000);
  }
}