const presets = [
  ['@babel/preset-env', { // babel preset
    targets: { // browser versions
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },

    // use polifils for target browsers
    // babel default uses core-js
    useBuiltIns: "entry"
  }]
];

module.exports = { presets };
