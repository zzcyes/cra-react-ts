/** @type {import('@rspack/cli').Configuration} */
const { merge } = require('webpack-merge');
const baseConfig = require('./config/rspack.config');

const config = merge(baseConfig, {});

module.exports = config;
