import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PERMISSIONS_KEY } from "../decorator/permissions.decorator";
import { User } from "src/users/entity/user.entity";
import { Permission } from "../entity/permission.entity";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      throw new ForbiddenException('Permissions insufisantes');
    }

    const hasPermission = requiredPermissions.every((permission: string) =>
      user.roles?.some((role) =>
        role.permissions?.some((p: string) => p === permission),
      ),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Permissions insufisantes');
    }
    return true;
  }
}
