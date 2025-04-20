import { SetMetadata } from '@nestjs/common';
export enum Role {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPER_ADMIN',
  VIEWER_ADMIN = 'VIEWER_ADMIN',
  USER_FIZ = 'USER_FIZ',
  USER_YUR = 'USER_YUR',
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
