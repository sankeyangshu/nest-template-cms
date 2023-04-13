/*
 * @Description: 日志实体类
 * @Author: 三棵杨树
 * @Date: 2023-04-13 20:46:37
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-13 20:55:56
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  method: string;

  @Column()
  data: string;

  @Column()
  result: number;

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn()
  user: User;
}
