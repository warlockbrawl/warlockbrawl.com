module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-preset-env': options['postcss-preset-env'] || {},
    'cssnano': env === 'production' ? (options['cssnano'] || {}) : false
  }
});
