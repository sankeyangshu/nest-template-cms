import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '@/entities/roles.entity';
import { RolesDto } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>) {}

  /**
   * @description: 创建新角色
   * @param {RolesDto} createRolesDto 角色信息
   * @return 创建结果
   */
  async create(createRolesDto: RolesDto) {
    const roles = await this.rolesRepository.create(createRolesDto);
    return this.rolesRepository.save(roles);
  }

  /**
   * @description: 查询全部角色
   * @return 全部角色列表
   */
  findAll() {
    return this.rolesRepository.find();
  }

  /**
   * @description: 查询单个角色
   * @param {number} id 角色id
   * @return 查询结果
   */
  findOne(id: number) {
    return this.rolesRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * @description: 更新角色信息
   * @param {RolesDto} updateRoleDto 角色信息
   * @return 更新结果
   */
  async update(updateRoleDto: RolesDto) {
    // 获取要更新的角色id
    const id = updateRoleDto.id;
    // 查询对应id的角色信息
    const role = await this.findOne(id);
    const newRole = this.rolesRepository.merge(role, updateRoleDto);
    return this.rolesRepository.save(newRole);
  }

  /**
   * @description: 删除角色
   * @param {number} id 角色ID
   * @return 删除结果
   */
  remove(id: number) {
    return this.rolesRepository.delete(id);
  }
}