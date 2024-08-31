module.exports = {
  // 提交类型
  types: [
    { value: 'feat', name: 'feat:     新特性增加' },
    { value: 'fix', name: 'fix:      bug修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    {
      value: 'style',
      name: 'style:    代码风格变更\n            (空格、换行、分号、可读性等)',
    },
    {
      value: 'refactor',
      name: 'refactor: 重构',
    },
    {
      value: 'perf',
      name: 'perf:     性能优化',
    },
    { value: 'test', name: 'test:     增加测试' },
    {
      value: 'chore',
      name: 'chore:    项目构建、辅助工具等\n            如文档生成器',
    },
    { value: 'revert', name: 'revert:   代码回退' },
    { value: 'wip', name: 'wip:      待完成' },
  ],

  // 修改范围
  scopes: [],

  //
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // 针对某些commit type覆盖修改范围
  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择你提交的类型 (必填):',
    scope: '\n选择此次修改的范围 (选填):',
    // 当allowCustomScopes: true时生效
    customScope: '填写此次修改的范围 (必填):',
    subject: '简短描述此次变更 (必填):\n',
    body: '具体描述此次变更 (选填). 使用 "|" 来进行换行:\n',
    breaking: '列出此次的不兼容变更 (选填):\n',
    footer: '列出此次变更修复的issue(s) id等 (选填):\n',
    confirmCommit: '确定提交上述commit message?',
  },
  // 允许添加新的修改范围
  allowCustomScopes: true,
  // 哪些类型中需要breakingchanges
  allowBreakingChanges: [
    'feat',
    'fix',
    'docs',
    'style',
    'refactor',
    'perf',
    'test',
    'chore',
    'revert',
    'wip',
  ],
  // 允许跳过哪个commit部分
  // skipQuestions: [],

  //subject长度限制
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix: '关闭的issues:',
  // askForBreakingChangeFirst : true, // default is false
};
