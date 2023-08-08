import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logs } from '@/entities/logs.entity';
import { CreateLoggerDto } from './dto/createLogger.dto';

@Injectable()
export class LoggersService {
  constructor(@InjectRepository(Logs) private readonly logsRepository: Repository<Logs>) {}

  /**
   * @description: 创建日志
   * @param {CreateLoggerDto} createLoggerDto 日志信息
   * @return 创建结果
   */
  async create(createLoggerDto: CreateLoggerDto) {
    const logs = this.logsRepository.create(createLoggerDto);
    return this.logsRepository.save(logs);
  }

  /**
   * @description: 获取所有日志
   * @param {number} pageNum 分页-页码
   * @param {number} pageSize 分页-条数
   * @return 全部日志列表
   */
  async findAll(pageNum: number, pageSize: number) {
    // page - 页码，limit - 每页条数，condition-查询条件(username, role, sex)，sort-排序
    const take = pageSize; // 条数
    const skip = (pageNum - 1) * take; // 页码 - 要跳过多少条

    const queryBuilder = this.logsRepository.createQueryBuilder('logs');

    // 获取查询结果
    const [list, total] = await queryBuilder.take(take).skip(skip).getManyAndCount();

    return { list, total, pageNum, pageSize };
  }

  /**
   * @description: 删除指定 ID 的日志
   * @param {number} id 日志ID
   * @return 删除结果
   */
  async remove(id: number) {
    // 判断要删除的日志是否存在
    const log = await this.logsRepository.findOne({ where: { id } });
    if (!log) {
      // 日志不存在
      throw new ForbiddenException('日志不存在，无法删除');
    }

    // 删除日志
    const { affected } = await this.logsRepository.delete(id);

    // affected 删除的行数
    if (affected > 0) {
      return 'success';
    } else {
      throw new ForbiddenException('删除失败，该日志不存在或者无法删除');
    }
  }
}
