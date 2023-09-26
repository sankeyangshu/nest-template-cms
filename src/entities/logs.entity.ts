import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn({ comment: '日志id' })
  id: number;

  @Column({ comment: '请求路径' })
  path: string;

  @Column({ comment: '请求方法' })
  method: string;

  @Column({ comment: '请求数据' })
  data: string;

  @Column({ comment: '请求结果' })
  result: string;

  @CreateDateColumn({ comment: '创建时间' })
  createtime: string;

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({ name: 'users_logs' })
  user: User;
}
