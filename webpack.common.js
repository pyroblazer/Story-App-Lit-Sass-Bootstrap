const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlWebpackPluginConfig = {
  meta: {
    viewport:
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
    'theme-color': '#4285f4',
  },
  templateParameters: {
    brandName: 'Stories',
  },
};

const htmlPages = [
  {
    filename: 'index.html',
    template: 'src/views/home.html',
    title: 'Home',
  },
  {
    filename: 'stories/add.html',
    template: 'src/views/stories/add.html',
    title: 'Add Story',
  },
  {
    filename: 'about.html',
    template: 'src/views/about.html',
    title: 'About',
  },
  {
    filename: 'auth/login.html',
    template: 'src/views/auth/login.html',
    title: 'Login',
  },
  {
    filename: 'auth/register.html',
    template: 'src/views/auth/register.html',
    title: 'About',
  },
];

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    ...htmlPages.map((page) => new HtmlWebpackPlugin({
      filename: page.filename,
      template: path.resolve(__dirname, page.template),
      title: page.title,
      ...htmlWebpackPluginConfig,
    })),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
