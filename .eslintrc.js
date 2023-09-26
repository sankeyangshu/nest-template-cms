module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // 添加 prettier 插件
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            // 以字母(或数字或下划线)或“@”后面跟着字母开头的东西,通常为内置模块引入
            '^@?\\w',
            // 内部导入 "@/"
            '^@(/.*|$)',
            // 父级导入. 把 `..` 放在最后.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // 同级导入. 把同一个文件夹.放在最后
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            // 带有副作用导入，比如import 'a.css'这种.
            '^\\u0000',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'error', // 导出
    'import/order': 'off',
  },
};
