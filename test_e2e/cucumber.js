module.exports = {
  default: {
    // tags: 'not @not_developed',
    tags: '@only and not @not_developed',
    format: ['html:report/report.html'],
    requireModule: ['ts-node/register'],
    require: ['steps/**/*.ts'],
    paths: ['../features/**/*.feature']
  }
};
