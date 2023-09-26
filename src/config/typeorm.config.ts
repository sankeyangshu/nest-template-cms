import { registerAs } from '@nestjs/config';
import * as config from 'config';
import { ConfigEnum } from '@/enum/config.enum';
import { resolve } from '@/utils';

// 获取数据库配置
const dbConfig = config.get('db');

// 获取实体类
const entities = [resolve('dist') + '/**/*.entity{.ts,.js}']; // 生产环境这里一定要注意是dist目录，否则会报连接异常

export default registerAs(ConfigEnum.DB_CONFIG, () => ({
  type: dbConfig.type, // 数据库类型
  host: dbConfig.host, // 主机
  port: dbConfig.port, // 端口号
  timezone: dbConfig.timezone, // 服务器上配置的时区 - 东八时区
  username: dbConfig.username, // 用户名
  password: dbConfig.password, // 密码
  database: dbConfig.database, // 数据库名称
  entities, // 实体类
  // autoLoadEntities: true, // 自动链接被 forFeature 注册的实体
  synchronize: dbConfig.synchronize, // 同步本地的schema与数据库-初始化数据库的时候使用，生产环境建议关闭
  logging: dbConfig.logging, // 是否打印日志,执行sql语句时候输出原生sql,也可以配置成一个数组["query", "error", "schema"]指定sql的执行类型
}));
