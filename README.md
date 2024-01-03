<h1 align="center">
  nest-template-cms
</h1>
<h4 align="center">使用 Nest+TS 构建的 CMS 开发框架</h4>

<p align="center">
  <img src="https://img.shields.io/github/license/sankeyangshu/nest-template-cms" alt="license" />
  <img src="https://img.shields.io/github/package-json/v/sankeyangshu/nest-template-cms" alt="version" />
  <img src="https://img.shields.io/github/languages/top/sankeyangshu/nest-template-cms" alt="languages" />
</p>

---

## 简介

🚀🚀🚀 **nest-template-cms** 一个基于 nestjs 框架的后台管理系统的基础模块的应用，使用了`NestJs`、`MySQL2`、`TypeORM`、`Docker`、`Redis`、`Typescript`等主流技术开发，集成了 jwt 认证模块、rbac 权限模块、cms 模块、swagger 模块、日志模块等诸多模块，集成了代码规范检查工具`Eslint`、`Prettier`。你可以在此之上直接开发你的业务代码！希望你能喜欢。👋👋👋

**注 1：如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！**

**注 2：由于本人工作较忙，所以项目更新频率较慢，但是本项目会长期维护，有问题可以提issue， 同时也欢迎大家来共建此项目，包括但不限于：bug 修复、代码优化、功能开发等等**

## ✨ 项目功能

- 🚀 采用最新技术栈开发：NestJs、MySQL2、TypeORM、Docker、Redis、TypeScript
- 🚀 整个项目集成了 TypeScript
- 🚀 使用 Prettier 统一格式化代码，集成 Eslint 代码校验规范（项目规范配置）
- 🚀 使用 husky、lint-staged、commitlint 规范提交信息（项目规范配置）

## 基础知识

提前了解和学习这些知识会对使用本项目有很大的帮助。

- [NestJs](https://docs.nestjs.com/) - 熟悉 `NestJs` 基础语法
- [TypeORM](https://typeorm.io/) - 熟悉 `TypeORM`基本使用
- [TypeScript](https://www.typescriptlang.org/) - 熟悉 `TypeScript` 基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 `ES6` 基本语法

## 配套资源

- [vue-template-admin](https://github.com/sankeyangshu/vue-template-admin) - 使用 Vue3 + TS 构建的后台管理系统
- [react-template-admin](https://github.com/sankeyangshu/react-template-admin) - 使用 React + TS 构建的后台管理系统

## 环境准备

本地环境需要安装 [pnpm7.x](https://www.pnpm.cn/)、[Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/)

- 必须使用[pnpm7.x](https://www.pnpm.cn/)，否则依赖可能安装不上。
- [Node.js](http://nodejs.org/) 版本要求`12.x`以上，这里推荐 `16.x` 及以上。

## Vscode 配套插件

如果你使用的 IDE 是[vscode](https://code.visualstudio.com/)(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- [Vscode NestJs Snippets](https://marketplace.visualstudio.com/items?itemName=ashinzekene.nestjs) - NestJs 开发必备
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) - Docker 插件
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化

## 安装和使用

### 🚀 使用脚手架

[Galaxy-CLI](https://github.com/sankeyangshu/galaxy-cli) 是一个用于快速生成各种**前后端项目模版**的脚手架。

```bash
# 选择合适的包管理工具安装脚手架
npm i -g galaxy-cli-core

# yarn
yarn global add galaxy-cli-core

# 推荐使用pnpm进行安装
pnpm i -g galaxy-cli-core

# 创建项目,按照脚手架提示，选择nest-template-cms模板
galaxy init <projectName>

# 进入项目目录
cd <projectName>

# 安装依赖 - 推荐使用pnpm
pnpm install

# 启动服务 development 模式
pnpm start:dev

# 启动服务 production 模式
pnpm start:prod

# 打包发布
pnpm build
```

### 克隆使用

```bash
# 克隆项目
git clone https://github.com/sankeyangshu/nest-template-cms.git

# 进入项目目录
cd nest-template-cms

# 安装依赖 - 推荐使用pnpm
pnpm install

# 启动服务 development 模式
pnpm start:dev

# 启动服务 production 模式
pnpm start:prod

# 打包发布
pnpm build
```

## 如何贡献

你可以[提一个 issue](https://github.com/sankeyangshu/nest-template-cms/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能，例如空格、分号等格式修正）
- `refactor`: 代码重构（不包括 bug 修复、功能新增）
- `perf`: 性能优化
- `test`: 添加、修改测试用例
- `build`: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
- `ci`: 修改 CI 配置、脚本
- `chore`: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
- `revert`: 回滚 commit

## 许可证

[MIT License](https://github.com/sankeyangshu/nest-template-cms/blob/master/LICENSE)
