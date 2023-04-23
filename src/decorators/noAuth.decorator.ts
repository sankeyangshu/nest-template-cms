import { SetMetadata } from '@nestjs/common';

export type INoAuth = 'ALL' | 'ROLES';

export const IS_AUTH = 'isAuth';

export const NoAuth = (name: INoAuth) => SetMetadata(IS_AUTH, name); // 如果使用了该装饰器，接口将不在进行jwt守卫验证
