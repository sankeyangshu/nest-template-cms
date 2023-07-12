import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resources } from '@/entities/resources.entity';
import { Repository } from 'typeorm';
import { ResourcesDto } from './dto/resources.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resources) private readonly resourcesRepository: Repository<Resources>
  ) {}

  /**
   * @description: 创建资源
   * @param {ResourcesDto} createResourcesDto 资源信息
   * @return 创建结果
   */
  async create(createResourcesDto: ResourcesDto) {
    const resources = await this.resourcesRepository.create(createResourcesDto);
    return this.resourcesRepository.save(resources);
  }

  /**
   * @description: 查询全部资源
   * @return 全部资源列表
   */
  findAll() {
    return this.resourcesRepository.find();
  }

  /**
   * @description: 查询某个资源
   * @param {number} id 资源id
   * @return 查询结果
   */
  findOne(id: number) {
    return this.resourcesRepository.findOne({
      where: { id },
    });
  }

  /**
   * @description: 更新资源信息
   * @param {ResourcesDto} updateResourcesDto 资源信息
   * @return 更新结果
   */
  async update(updateResourcesDto: ResourcesDto) {
    // 获取要更新的资源id
    const id = updateResourcesDto.id;
    // 查询对应的资源信息
    const resources = await this.findOne(id);
    const newResources = this.resourcesRepository.merge(resources, updateResourcesDto);
    return this.resourcesRepository.save(newResources);
  }

  /**
   * @description: 删除资源
   * @param {number} id 资源id
   * @return 删除结果
   */
  remove(id: number) {
    return this.resourcesRepository.delete(id);
  }
}
