/*
 * @Description: 用户实体类
 * @Author: 三棵杨树
 * @Date: 2023-04-01 16:16:23
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-13 21:00:52
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Logs } from './logs.entity';
import { Roles } from './roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({ name: 'users_roles' })
  roles: Roles[];
}
