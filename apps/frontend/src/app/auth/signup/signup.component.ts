import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  signup({ username, email, password }: any) {
    console.log('Signup data: ', username, email, password);
  }
}
