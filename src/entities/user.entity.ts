import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Logs } from './logs.entity';
import { Roles } from './roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: '用户id' })
  id: number;

  @Column({ comment: '用户名', unique: true, nullable: false })
  username: string;

  @Column({ comment: '密码', nullable: false })
  password: string;

  @Column({ length: 45, default: null, unique: false, comment: '联系方式' })
  contact: string;

  @Column({ length: 45, default: null, unique: false, comment: '邮箱' })
  email: string;

  @Column({
    type: 'int',
    default: 1,
    unique: false,
    comment: '用户类型：1管理员,2普通用户,3其他用户',
  })
  userType: number;

  @Column({ type: 'int', default: 1, unique: false, comment: '用户状态：1是启用，其他是禁用' })
  status: number;

  @CreateDateColumn({ comment: '创建时间' })
  createtime: string;

  @UpdateDateColumn({ comment: '更新时间' }) //自动生成并自动更新列
  updatetime: string;

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({ name: 'users_roles' })
  roles: Roles[];
}
