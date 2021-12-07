const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  modifyVars: { "@primary-color": "523C3C" },
  future: {
    webpack5: false,
  },
  reactStrictMode: true,
});
