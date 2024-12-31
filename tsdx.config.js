/* eslint-disable @typescript-eslint/no-require-imports */
const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup: {
    plugins: [
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
};
