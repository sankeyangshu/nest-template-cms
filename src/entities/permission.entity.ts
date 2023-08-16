import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({ comment: '权限id' })
  id: number;

  @Column({
    comment: '权限名称',
    length: 50,
  })
  permName: string;

  @Column({
    comment: '权限描述',
    length: 100,
    nullable: true,
  })
  description: string;

  @CreateDateColumn({ comment: '创建时间' })
  createtime: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updatetime: Date;

  @ManyToMany(() => Roles, (roles) => roles.permissions)
  roles: Roles[];
}
