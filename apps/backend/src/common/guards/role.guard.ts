import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '@prisma/client';
import { JwtPayload } from 'src/graphql';

// reference https://docs.nestjs.com/security/authorization#basic-rbac-implementation

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the roles from the decorator
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      throw new ForbiddenException('Role not found');
    }

    // Get the user from the request object
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    if (!user) {
      throw new ForbiddenException('Invalid user or roles');
    }

    // Check if the user has the required role
    const hasRequiredRole = requiredRoles.some((role) =>
      user.role_name.includes(role),
    );

    if (!hasRequiredRole) {
      throw new ForbiddenException('Unauthorized');
    }

    return true;
  }
}
