import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

// transpile to es5, cjs for backwards compatibility. Bundlers will still
//   // use the es6 version due to package.json's `module` field.
//   presets: [
//     ['env', {
//       {targets: ['']}
//     }]
//   ]
// }
const base = {
  input: 'src/index.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    babel({exclude:['node_modules/*']}),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
};

const normal = Object.assign({}, base, {
  output: [{
    file: 'dist/es6.js',
    format: 'es'
  }, {
    file: 'dist/common.js',
    format: 'cjs'
  }]
});
const plugins = [
  ...base.plugins.slice(0, 3),
  babel({
    'presets': [
      ['env', {
        'targets': {
          'browsers': ['last 2 versions', 'safari >= 7']
        },
        'modules': false
      }]
    ]
  })
];
const browser = Object.assign({}, base, {
  output: {
    name: 'geojsonToGml',
    file: 'dist/umd.js',
    format: 'umd'
  },
  plugins
});
export default [normal, browser];
