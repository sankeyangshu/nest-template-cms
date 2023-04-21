import * as path from 'path';

/**
 * @description: 获取文件夹所对应的路径
 * @param {string} dir 文件夹名
 * @return {string} 路径
 */
export const resolve = (dir: string) => path.join(path.resolve(__dirname, '../../'), dir);
