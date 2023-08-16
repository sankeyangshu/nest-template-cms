import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userServicese: UserService
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('角色守卫');

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const permissionList =
      this.reflector.getAllAndOverride<string[]>('permissions', [
        context.getClass(),
        context.getHandler(),
      ]) || [];

    if (permissionList.length === 0) return true;

    return this.userServicese.verfiyAutorify(user.id, permissionList);
  }
}
