import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class Resources {
  @PrimaryGeneratedColumn({ comment: '资源id' })
  id: number;

  @Column({ comment: '资源名称' })
  title: string;

  @Column({ comment: '资源唯一标记', unique: true })
  signName: string;

  @Column({ comment: '资源地址' })
  url: string;

  @Column({
    type: 'int',
    unique: false,
    comment: '资源类型：1是菜单(与前端关联)，2是api接口(与后端关联)',
  })
  authType: number;

  @Column({ comment: '上级id' })
  pid: number;

  @Column({ type: 'int', default: 1, unique: false, comment: '状态：1是启用，其他是禁用' })
  status: number;

  @Column({ type: 'int', default: 10, unique: false, comment: '排序' })
  sort: number;

  @CreateDateColumn({ comment: '创建时间' })
  createtime: string;

  @UpdateDateColumn({ comment: '更新时间' }) //自动生成并自动更新列
  updatetime: string;

  @ManyToMany(() => Roles, (roles) => roles.auths, { cascade: true })
  roles: Roles[];
}
