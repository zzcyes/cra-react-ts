module.exports = {
  extends: ['cz'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    // 'scope-case': [2, 'always', 'lower-case'],括号内小写还是太严格了，有可能要填写一些变量名
    'subject-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'wip'],
    ],
  },
};
