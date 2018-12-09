const { getOptions } = require('loader-utils');

module.exports = function(source) {
  options = getOptions(this);

  source = source
    .replace(/{{{{TYPE}}}}/g, options.type)
    .replace(/{{{{ID}}}}/g, options.id)
    .replace(/{{{{ARTICLE}}}}/g, `${options.article || options.id}.md`);

  return source;
};
