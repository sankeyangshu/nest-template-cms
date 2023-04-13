/*
 * @Description: 权限实体类
 * @Author: 三棵杨树
 * @Date: 2023-04-13 20:45:24
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-13 20:59:24
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User;
}
