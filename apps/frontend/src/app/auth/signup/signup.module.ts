import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth.module';
import { SignupComponent } from './signup.component';
import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [CommonModule, AuthModule],
})
export class SignupModule {}
