module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档修改
        'style', // 代码格式修改
        'refactor', // 代码重构
        'perf', // 优化相关
        'test', // 测试用例修改
        'chore', // 其他修改
        'revert', // 回滚到上一个版本
        'build', // 编译相关的修改
        'ci' // 持续集成相关
      ]
    ],
    'type-case': [2, 'always', 'lower-case'], // type必须小写
    'type-empty': [2, 'never'], // type不能为空
    'scope-empty': [0], // scope可以为空
    'scope-case': [0], // scope格式不限制
    'subject-full-stop': [0], // subject结尾不加'.'
    'subject-case': [0], // subject格式不限制
    'header-max-length': [0, 'always', 72] // header最长72
  }
}
