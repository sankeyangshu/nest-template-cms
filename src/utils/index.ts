import * as path from 'path';
import { Resources } from '@/entities/resources.entity';

/**
 * 菜单列表类型
 */
type menuListType = Resources & { children?: menuListType[] };

/**
 * @description: 获取文件夹所对应的路径
 * @param {string} dir 文件夹名
 * @return {string} 路径
 */
export const resolve = (dir: string): string => path.join(path.resolve(__dirname, '../../'), dir);

/**
 * @description: 菜单列表转为树形结构
 * @param {menuListType} menuList 菜单列表
 * @param {number} pId 父级id
 * @return 树形结构
 */
export const menuConvertToTree = (menuList: menuListType[], pId: number | null = null) => {
  const tree: menuListType[] = [];

  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].pid === pId) {
      const children = menuConvertToTree(menuList, menuList[i].id);
      if (children.length) {
        menuList[i].children = children;
      }
      tree.push(menuList[i]);
    }
  }

  return tree;
};
