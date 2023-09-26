module.exports = {
  default: {
    // tags: '@only',
    tags: 'not @not_developed',
    format: ['html:report/report.html'],
    requireModule: ['ts-node/register'],
    require: ['steps/**/*.ts'],
    paths: ['../features/en/**/*.feature']
  }
};
