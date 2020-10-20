module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: [
          'chrome >= 61',
          'firefox >= 55',
          'opera >= 49',
          'ios >= 10.3',
          'safari >= 10.1',
          'edge >= 15',
        ],
        node: '8.9.0',
      },
    }],
    '@babel/preset-react',
  ],
  env: {
    test2: {
      plugins: [
        'istanbul',
      ],
    },
  },
  plugins: [
    'babel-plugin-styled-components',
  ],
};
