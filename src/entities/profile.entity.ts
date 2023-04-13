/*
 * @Description: 用户信息实体类
 * @Author: 三棵杨树
 * @Date: 2023-04-13 20:36:43
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2023-04-13 20:49:15
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: number;

  @Column()
  photo: string;

  @Column()
  address: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
