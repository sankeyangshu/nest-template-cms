import { SelectQueryBuilder } from 'typeorm';

/**
 * @description: 判断查询条件是否存在，并返回查询语句
 * @param {SelectQueryBuilder} queryBuilder 要操作的实体
 * @param {Object} obj 查询参数
 * @return 查询语句
 */
export const conditionUtils = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: Record<string, unknown>
) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      queryBuilder.andWhere(`${key} = :${key}`, { [key]: obj[key] });
    }
  });
  return queryBuilder;
};
