import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class AtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
