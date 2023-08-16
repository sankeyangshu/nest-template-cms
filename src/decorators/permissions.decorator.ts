import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);

// 接口权限标志 装饰器
export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions);
