import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export class AuthComponent implements OnInit {
  @Output() onSubmitEvent = new EventEmitter<any>();
  @Input() submitLabel: string | undefined;

  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit(): void {}

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      return 'Invalid email';
    }
    return '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Invalid email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Invalid email';
    }
    return '';
  }

  onSubmit() {
    this.onSubmitEvent.emit({
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
    });
  }
}
