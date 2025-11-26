import angular from "angular";

// Create main app module
export const app = angular.module("myApp", []);

const requireAll = (r) => {
  r.keys().forEach(r);
};

requireAll(require.context("../features", true, /\.directive\.js$/));
