/*
 * @Description: swagger配置文件
 * @Author: 三棵杨树
 * @Date: 2023-03-30 20:36:47
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-03-30 20:51:16
 */
import type { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * @description: 设置swagger
 * @param {NestExpressApplication} app 应用程序
 */
export const setupSwagger = (app: NestExpressApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('后台管理系统')
    .setDescription('nest-tmplate-cms 接口文档')
    .setVersion('v0.0.1')
    .addTag('beta')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/swagger', app, document);
};
