module.exports = {
  default: {
    // tags: 'not @not_developed',
    tags: '@only',
    format: ['html:report/report.html'],
    requireModule: ['ts-node/register'],
    require: ['steps/**/*.ts'],
    paths: ['../features/**/*.feature']
  }
};
