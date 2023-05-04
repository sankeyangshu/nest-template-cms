import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authority } from '@/entities/authority.entity';
import { Repository } from 'typeorm';
import { AuthorityDto } from './dto/authority.dto';

@Injectable()
export class AuthorityService {
  constructor(
    @InjectRepository(Authority) private readonly authorityRepository: Repository<Authority>
  ) {}

  /**
   * @description: 创建资源
   * @param {AuthorityDto} createAuthorityDto 资源信息
   * @return 创建结果
   */
  async create(createAuthorityDto: AuthorityDto) {
    const authority = await this.authorityRepository.create(createAuthorityDto);
    return this.authorityRepository.save(authority);
  }

  /**
   * @description: 查询全部资源
   * @return 全部资源列表
   */
  findAll() {
    return this.authorityRepository.find();
  }

  /**
   * @description: 查询某个资源
   * @param {number} id 资源id
   * @return 查询结果
   */
  findOne(id: number) {
    return this.authorityRepository.findOne({
      where: { id },
    });
  }

  /**
   * @description: 更新资源信息
   * @param {AuthorityDto} updateAuthorityDto 资源信息
   * @return 更新结果
   */
  async update(updateAuthorityDto: AuthorityDto) {
    // 获取要更新的资源id
    const id = updateAuthorityDto.id;
    // 查询对应的资源信息
    const authority = await this.findOne(id);
    const newAuthority = this.authorityRepository.merge(authority, updateAuthorityDto);
    return this.authorityRepository.save(newAuthority);
  }

  /**
   * @description: 删除资源
   * @param {number} id 资源id
   * @return 删除结果
   */
  remove(id: number) {
    return this.authorityRepository.delete(id);
  }
}
