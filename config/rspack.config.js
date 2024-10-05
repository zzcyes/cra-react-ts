/** @type {import('@rspack/cli').Configuration} */
const fs = require('fs');
const path = require('path');
const resolve = require('resolve');
const rspack = require('@rspack/core');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const ESLintPlugin = require('eslint-rspack-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const modules = require('./modules');
const createDevServerConfig = require('./rspackDevServer.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require("@zzcyes/interpolate-html-plugin")


// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const webpackEnv = process.env.NODE_ENV;
const isEnvDevelopment = webpackEnv === 'development';
const isEnvProduction = webpackEnv === 'production';

console.log('isEnvDevelopment', isEnvDevelopment);
console.log('isEnvProduction', isEnvProduction);

const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true';

// Check if Tailwind config exists
const useTailwind = fs.existsSync(
  path.join(paths.appPath, 'tailwind.config.js')
);

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);
const ForkTsCheckerWebpackPlugin =
  process.env.TSC_COMPILE_ON_ERROR === 'true'
    ? require('react-dev-utils/ForkTsCheckerWarningWebpackPlugin')
    : require('react-dev-utils/ForkTsCheckerWebpackPlugin');

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

console.debug("env",env)
console.debug("process.env.PUBLIC_URL",process.env.PUBLIC_URL)

// common function to get style loaders
const getpostcss = () => {
  return {
    // Options for PostCSS as we reference these options twice
    // Adds vendor prefixing based on your specified browser support in
    // package.json
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        config: false,
        plugins: !useTailwind
          ? [
              'postcss-flexbugs-fixes',
              [
                'postcss-preset-env',
                {
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                },
              ],
              // Adds PostCSS Normalize as the reset css with default options,
              // so that it honors browserslist config in package.json
              // which in turn let's users customize the target behavior as per their needs.
              'postcss-normalize',
            ]
          : [
              'tailwindcss',
              'postcss-flexbugs-fixes',
              [
                'postcss-preset-env',
                {
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                },
              ],
            ],
      },
      sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
    },
  };
};

const config = {
  target: ['browserslist'],
  stats: 'errors-warnings',
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',
  entry: {
    main: './src/index.tsx', // 配置项目入口文件
  },
  output: {
    // The build folder.
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    // pathinfo: isEnvDevelopment,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].js'
      : isEnvDevelopment && 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
    // webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: paths.publicUrlOrPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    // devtoolModuleFilenameTemplate: isEnvProduction
    //   ? (info) =>
    //       path
    //         .relative(paths.appSrc, info.absoluteResourcePath)
    //         .replace(/\\/g, '/')
    //   : isEnvDevelopment &&
    //     ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
  },
  resolve: {
    extensions: paths.moduleFileExtensions
      .map((ext) => `.${ext}`)
      .filter((ext) => useTypeScript || !ext.includes('ts')),
    alias: {
      'store': path.resolve(__dirname, '../src/store'),  // 别名 store 指向 src/store
      'pages': path.resolve(__dirname, '../src/pages'),  // 别名 pages 指向 src/pages
      'layouts': path.resolve(__dirname, '../src/layouts'),  // 别名 pages 指向 src/pages
      'components': path.resolve(__dirname, '../src/components'),  // 别名 pages 指向 src/pages
     'services':path.resolve(__dirname, '../src/services'),  // 别名 pages 指向 src/pages
     'router':path.resolve(__dirname, '../src/router'),  // 别名 pages 指向 src/pages
     'assets':path.resolve(__dirname, '../src/assets'),  // 别名 pages 指向 src/pages
     'hooks':path.resolve(__dirname, '../src/hooks'),  // 别名 pages 指向 src/pages
      ...(modules.webpackAliases || {}),
    },
    preferAbsolute: true, // prefer relative paths
    preferRelative: true, // prefer relative paths
    extensionAlias: {
      '.js': ['.ts', '.js'],
    },
  },
  experiments: {
    css:true
  },
  module: {
    rules: [
      {
        oneOf: [
          // TODO: Merge this config once `image/avif` is in the mime-db
          // https://github.com/jshttp/mime-db
          {
            test: [/\.avif$/],
            type: 'asset',
            mimetype: 'image/avif',
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit,
              },
            },
          },
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit,
              },
            },
          },
          {
            test: /\.svg$/i,
            type: 'asset',
            resourceQuery: /url/,
          },
          {
            test: /\.svg(?!url)$/i,
            issuer: /\.[jt]sx?$/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  prettier: false,
                  svgo: false,
                  svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                  },
                  titleProp: true,
                  ref: true,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [getpostcss()],
            type: 'css',
          },
          {
            test: /\.(scss|sass)$/,
            use: [
              getpostcss(),
              {
                loader: require.resolve('resolve-url-loader'),
                options: {
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                  root: paths.appSrc,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
            type: 'css/auto',
          },
          {
            test: /\.less$/,
            use: [
              getpostcss(),
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    modifyVars: {},
                    javascriptEnabled: true,
                  },
                },
              },
            ],
            type: 'css/auto',
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            loader: 'builtin:swc-loader',
            include: paths.appSrc,
            exclude: [/node_modules/],
            options: {
              sourceMap: true,
              env: {
                targets: ['last 10 chrome version'],
                mode: 'usage',
                coreJs: '3.30.1',
              },
              jsc: {
                externalHelpers: true,
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: hasJsxRuntime ? 'automatic' : 'classic',
                    pragma: 'React.createElement',
                    pragmaFrag: 'React.Fragment',
                    throwIfNamespace: true,
                    development: isEnvDevelopment,
                    refresh: isEnvDevelopment,
                    useBuiltins: true,
                  },
                },
              },
            },
            type: 'javascript/auto',
          },
        ],
      },
    ],
  },
  devServer: createDevServerConfig(),
  plugins: [
    isEnvDevelopment && new ReactRefreshPlugin(),
    new rspack.DefinePlugin(env.stringified),
    // TypeScript type checking
    useTypeScript &&
      new ForkTsCheckerWebpackPlugin({
        async: isEnvDevelopment,
        typescript: {
          typescriptPath: resolve.sync('typescript', {
            basedir: paths.appNodeModules,
          }),
          configOverwrite: {
            compilerOptions: {
              sourceMap: isEnvProduction
                ? shouldUseSourceMap
                : isEnvDevelopment,
              skipLibCheck: true,
              inlineSourceMap: false,
              declarationMap: false,
              noEmit: true,
              incremental: true,
              tsBuildInfoFile: paths.appTsBuildInfoFile,
            },
          },
          context: paths.appPath,
          diagnosticOptions: {
            syntactic: true,
          },
          mode: 'write-references',
          // profile: true,
        },
        issue: {
          // This one is specifically to match during CI tests,
          // as micromatch doesn't match
          // '../cra-template-typescript/template/src/App.tsx'
          // otherwise.
          include: [
            { file: '../**/src/**/*.{ts,tsx}' },
            { file: '**/src/**/*.{ts,tsx}' },
          ],
          exclude: [
            { file: '**/src/**/__tests__/**' },
            { file: '**/src/**/?(*.){spec|test}.*' },
            { file: '**/src/setupProxy.*' },
            { file: '**/src/setupTests.*' },
          ],
        },
        logger: {
          infrastructure: 'silent',
        },
      }),
    !disableESLintPlugin &&
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        formatter: require.resolve('react-dev-utils/eslintFormatter'),
        eslintPath: require.resolve('eslint'),
        failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
        context: paths.appSrc,
        cache: true,
        cacheLocation: path.resolve(
          paths.appNodeModules,
          '.cache/.eslintcache'
        ),
        // ESLint class options
        cwd: paths.appPath,
        resolvePluginsRelativeTo: __dirname,
        baseConfig: {
          extends: [require.resolve('eslint-config-react-app/base')],
          rules: {
            ...(!hasJsxRuntime && {
              'react/react-in-jsx-scope': 'error',
            }),
          },
        },
      }),
      new rspack.HtmlRspackPlugin({
        template: './public/index.html', // 对齐 CRA 生成index.html
        filename: 'index.html',
        // templateParameters: {
        //   REACT_APP_IS_PRODUCTION: !!env.raw.REACT_APP_IS_PRODUCTION,
        // },
      }),
      new InterpolateHtmlPlugin(rspack.HtmlRspackPlugin, env.raw),
      // new HtmlWebpackPlugin(
      //   Object.assign(
      //     {},
      //     {
      //       inject: true,
      //       template: paths.appHtml,
      //     },
      //     isEnvProduction
      //       ? {
      //           minify: {
      //             removeComments: true,
      //             collapseWhitespace: true,
      //             removeRedundantAttributes: true,
      //             useShortDoctype: true,
      //             removeEmptyAttributes: true,
      //             removeStyleLinkTypeAttributes: true,
      //             keepClosingSlash: true,
      //             minifyJS: true,
      //             minifyCSS: true,
      //             minifyURLs: true,
      //           },
      //         }
      //       : undefined,
      //   ),
      // ),
      new rspack.CopyRspackPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
  ].filter(Boolean),
};
module.exports = config;