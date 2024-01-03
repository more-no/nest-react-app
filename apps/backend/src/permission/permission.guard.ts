import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// this Guard can be attached to an entire controller, or to a specific method in that controller..

@Injectable()
export class PermissionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // this is just a mock implementation of a Guard - there is no logic..
    // but by simply change this to false, has the effect of blocking the entire controller to which it is attached..
    return true;
  }
}
