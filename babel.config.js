module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "root": [
          "./src"
        ],
        "alias": {
          "~types": "./src/types",
          "~assets": "./src/assets",
          "~components": "./src/components",
          "~services": "./src/services",
          "~utils": "./src/utils",
          "~redux": "./src/redux",
          "~const": "./src/const",
          "~views": "./src/views",
          "~routes": "./src/routes"
        }
      }
    ]
  ]
};
