import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Resources } from '@/entities/resources.entity';
import { Roles } from '@/entities/roles.entity';
import { User } from '@/entities/user.entity';
import { menuConvertToTree } from '@/utils';
import { GetRolesListDto } from './dto/getRolesList.dto';
import { RolesDto } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Resources) private readonly resourcesRepository: Repository<Resources>
  ) {}

  /**
   * @description: 创建新角色
   * @param {RolesDto} createRolesDto 角色信息
   * @param {User} userLogin 登录用户信息
   * @return 创建结果
   */
  async create(createRolesDto: RolesDto, userLogin: User) {
    // 判断用户是否有权限创建新角色
    if (userLogin.userType !== 0) {
      // 登录用户不是超级管理员，无法创建任何角色
      throw new ForbiddenException('你没有权限创建角色');
    }

    // 判断要创建的角色是否存在
    const createRole = await this.rolesRepository.findOne({
      where: {
        roleType: createRolesDto.roleType,
      },
    });
    if (createRole) {
      // 角色存在
      throw new BadRequestException('角色已存在');
    }

    // 创建角色
    const roles = this.rolesRepository.create(createRolesDto);

    // 判断角色资源是否存在
    if (createRolesDto.resourceIds) {
      roles.resources = await this.resourcesRepository.findBy({
        id: In(createRolesDto.resourceIds),
      });
    }

    return this.rolesRepository.save(roles);
  }

  /**
   * @description: 查询全部角色
   * @param {GetRolesListDto} query 查询参数
   * @return 全部角色列表
   */
  async findAll(query: GetRolesListDto) {
    // 判断是否需要分页
    if (query.isNotPage) {
      return this.rolesRepository.find();
    }

    // page - 页码，limit - 每页条数，condition-查询条件(username, role, sex)，sort-排序
    const { pageNum = 1, pageSize = 10 } = query;
    const take = pageSize; // 条数
    const skip = (pageNum - 1) * take; // 页码 - 要跳过多少条

    const queryBuilder = this.rolesRepository.createQueryBuilder('roles');

    // 获取查询结果
    const [list, total] = await queryBuilder.take(take).skip(skip).getManyAndCount();

    return { list, total, pageNum, pageSize };
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
   * @description: 获取角色菜单列表
   * @param {number} roleID 角色id
   * @return 角色菜单列表
   */
  async findRoleResources(roleID: number) {
    const roleMenuList = await this.rolesRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.resources', 'resource')
      .where('role.id = :id', { id: roleID })
      .orderBy('resource.sort', 'ASC')
      .getOne();

    const menus = roleMenuList?.resources.reduce((mergedMenus, resource) => {
      mergedMenus[resource.id] = resource;
      return mergedMenus;
    }, {});

    return menuConvertToTree(Object.values(menus));
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

    // 角色不存在
    if (!role) {
      throw new BadRequestException('角色不存在');
    }

    const newRole = this.rolesRepository.merge(role, updateRoleDto);
    return this.rolesRepository.save(newRole);
  }

  /**
   * @description: 删除角色
   * @param {number} id 角色ID
   * @param {User} userLogin 登录用户信息
   * @return 删除结果
   */
  async remove(id: number, userLogin: User) {
    // 判断要删除的角色是否存在
    const role = await this.findOne(id);
    if (!role) {
      // 角色不存在
      throw new ForbiddenException('角色不存在，无法删除');
    }

    // 判断用户是否有权限删除角色
    if (userLogin.userType !== 0) {
      // 登录用户不是超级管理员，无法删除角色
      throw new ForbiddenException('你没有权限删除角色');
    }

    // 删除角色
    const { affected } = await this.rolesRepository.delete(id);

    // affected 删除的行数
    if (affected > 0) {
      return 'success';
    } else {
      throw new ForbiddenException('删除失败，该角色不存在或者无法删除');
    }
  }
}
