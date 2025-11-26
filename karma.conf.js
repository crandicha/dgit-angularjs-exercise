module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "node_modules/angular/angular.js", // AngularJS
      "node_modules/angular-mocks/angular-mocks.js", // AngularJS mocks
      "src/**/*.spec.js", // Your tests
      "src/**/*.js", // Your source code
    ],
    preprocessors: {
      "src/**/*.js": ["webpack"],
      "src/**/*.spec.js": ["webpack"],
    },
    webpack: {
      // Your Webpack config here
      mode: "development",
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: "babel-loader",
          },
          {
            test: /\.html$/,
            use: "raw-loader",
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    },
    reporters: ["progress"],
    browsers: ["ChromeHeadless"],
    singleRun: true,
  });
};
