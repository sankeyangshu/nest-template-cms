import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resources } from '@/entities/resources.entity';
import { Repository } from 'typeorm';
import { ResourcesDto } from './dto/resources.dto';
import { User } from '@/entities/user.entity';
import { menuConvertToTree } from '@/utils';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resources) private readonly resourcesRepository: Repository<Resources>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  /**
   * @description: 创建资源
   * @param {ResourcesDto} createResourcesDto 资源信息
   * @return 创建结果
   */
  async create(createResourcesDto: ResourcesDto) {
    const resources = this.resourcesRepository.create(createResourcesDto);
    return this.resourcesRepository.save(resources);
  }

  /**
   * @description: 查询全部资源
   * @return 全部资源列表
   */
  findAll() {
    return this.resourcesRepository.find({ order: { sort: 'ASC' } });
  }

  /**
   * @description: 获取用户菜单
   * @param {User} user 用户信息
   * @return 用户菜单列表
   */
  async findUserMenu(user: User) {
    const userMenuList = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.resources', 'resource')
      .where('user.id = :id', { id: user.id })
      .orderBy('resource.sort', 'ASC')
      .getOne();

    const menus = userMenuList?.roles.reduce((mergedMenus, role) => {
      role.resources.forEach((menu) => {
        mergedMenus[menu.id] = menu;
      });
      return mergedMenus;
    }, {});

    return menuConvertToTree(Object.values(menus));
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

    // 判断资源是否存在
    if (!resources) {
      throw new BadRequestException('资源不存在');
    }

    const newResources = this.resourcesRepository.merge(resources, updateResourcesDto);
    return this.resourcesRepository.save(newResources);
  }

  /**
   * @description: 删除资源
   * @param {number} id 资源id
   * @param {number} authType 资源类型
   * @return 删除结果
   */
  async remove(id: number, authType: number) {
    const res = await this.resourcesRepository.find({
      where: [
        { id, authType },
        { pid: id, authType },
      ],
    });
    // 判断资源是否存在
    if (res.length < 1) {
      throw new BadRequestException('删除失败，该资源不存在');
    }
    if (res.length > 1 && authType === 1) {
      throw new BadRequestException('删除失败，该菜单存在子菜单');
    }
    // 删除资源
    const { affected } = await this.resourcesRepository.delete(id);
    // affected 删除的行数
    if (affected > 0) {
      return 'success';
    } else {
      throw new BadRequestException('删除失败，该资源不存在或者无法删除');
    }
  }
}
