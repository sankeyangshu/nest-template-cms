import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Authority } from './authority.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn({ comment: '角色id' })
  id: number;

  @Column({ comment: '角色名称' })
  name: string;

  @Column({ comment: '角色描述', nullable: true })
  description: string;

  @Column({ comment: '角色类型', default: 1, nullable: false })
  roleType: number;

  @Column({ type: 'int', unique: false, comment: '角色状态：1是启用，0为禁用' })
  status: number;

  @Column({ type: 'int', default: 10, unique: false, comment: '排序' })
  sort: number;

  @CreateDateColumn({ comment: '创建时间' })
  createTime: string;

  @UpdateDateColumn({ comment: '更新时间' }) // 自动生成并自动更新列
  updateTime: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User;

  @ManyToMany(() => Authority, (auths) => auths.roles)
  auths: Authority;
}
