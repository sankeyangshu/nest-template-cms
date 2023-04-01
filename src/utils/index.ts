/*
 * @Description: 工具类函数
 * @Author: 三棵杨树
 * @Date: 2023-04-01 16:49:53
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-01 16:51:28
 */
import * as path from 'path';

/**
 * @description: 获取文件夹所对应的路径
 * @param {string} dir 文件夹名
 * @return {string} 路径
 */
export const resolve = (dir: string) => path.join(path.resolve(__dirname, '../../'), dir);
