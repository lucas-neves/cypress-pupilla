const fs = require('fs-extra');
const path = require('path');

const cypressConfigResolverByFile = (filename) => {
  const pathToConfigFile = path.resolve(`cypress/fixtures/${filename}.json`);
  return fs.readJsonSync(pathToConfigFile);
};
const cypressConfigResolver = () =>
  cypressConfigResolverByFile(process.env.CYPRESS_ENV || 'homolog');

module.exports.cypressConfigResolver = cypressConfigResolver;