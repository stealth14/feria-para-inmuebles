const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  images: {
    domains: ['placeimg.com'],
  },
  future: {
    webpack5: false,
  },
  reactStrictMode: true,
});
