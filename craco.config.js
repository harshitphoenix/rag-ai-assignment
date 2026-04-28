/** Use root postcss.config.js (CRA webpack sets config: false, so this opts into file-based PostCSS). */
module.exports = {
  style: {
    postcss: {
      mode: 'file',
    },
  },
};
