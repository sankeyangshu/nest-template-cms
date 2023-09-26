import { registerAs } from '@nestjs/config';
import * as config from 'config';
import { ConfigEnum } from '@/enum/config.enum';

// 获取jwt配置
const jwtConfig = config.get('jwt');

export default registerAs(ConfigEnum.JWT_CONFIG, () => ({
  ...jwtConfig,
}));
