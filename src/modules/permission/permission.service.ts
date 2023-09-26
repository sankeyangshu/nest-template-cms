import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '@/entities/permission.entity';
import { PermissionDto } from './dto/permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
  ) {}

  /**
   * @description: 创建新权限
   * @param {PermissionDto} createPermissionDto 权限信息
   * @return 创建结果
   */
  async create(createPermissionDto: PermissionDto) {
    // 判断要创建的权限是否存在
    const createPermission = await this.permissionRepository.findOne({
      where: {
        permName: createPermissionDto.permName,
      },
    });
    if (createPermission) {
      // 权限存在
      throw new BadRequestException('权限已存在');
    }

    const permission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(permission);
  }

  /**
   * @description: 查询全部权限列表
   * @return 权限列表信息
   */
  findAll() {
    return this.permissionRepository.find();
  }

  /**
   * @description: 删除权限
   * @param {number} id 要删除的权限id
   * @return 删除结果
   */
  async remove(id: number) {
    // 判断要删除的权限是否存在
    const permission = await this.permissionRepository.findOne({
      where: {
        id,
      },
    });
    if (!permission) {
      throw new ForbiddenException('权限不存在，无法删除');
    }

    // 删除权限
    const { affected } = await this.permissionRepository.delete(id);

    // affected 删除的行数
    if (affected > 0) {
      return 'success';
    } else {
      throw new ForbiddenException('删除失败，该权限不存在或者无法删除');
    }
  }
}
