import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Resources } from './resources.entity';
import { User } from './user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn({ comment: '角色id' })
  id: number;

  @Column({ comment: '角色名称' })
  roleName: string;

  @Column({ comment: '角色描述', nullable: true })
  description: string;

  @Column({ comment: '角色唯一标记', unique: true, nullable: false })
  roleType: string;

  @Column({ type: 'boolean', default: true, unique: false, comment: '角色状态' })
  status: boolean;

  @Column({ type: 'int', default: 10, unique: false, comment: '排序' })
  sort: number;

  @CreateDateColumn({ comment: '创建时间' })
  createtime: string;

  @UpdateDateColumn({ comment: '更新时间' }) // 自动生成并自动更新列
  updatetime: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'roles_permission',
  })
  permissions: Permission[];

  @ManyToMany(() => Resources, (resources) => resources.roles)
  @JoinTable({
    name: 'roles_resources',
  })
  resources: Resources[];
}
