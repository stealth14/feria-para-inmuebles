const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  future: {
    webpack5: false,
  },
  reactStrictMode: true,
});
