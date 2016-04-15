var packages = [
  require('./api/package.json'),
  require('./step-1/package.json'),
  require('./step-2/package.json'),
  require('./step-3/package.json'),
  require('./step-4/package.json'),
  require('./step-5/package.json'),
  require('./step-6/package.json'),
  require('./step-7/package.json'),
  // require('./step-8/package.json'),
  require('./step-1-done/package.json'),
  require('./step-2-done/package.json'),
  require('./step-3-done/package.json'),
  require('./step-4-done/package.json'),
  require('./step-5-done/package.json'),
  require('./step-6-done/package.json'),
  // require('./step-8-done/package.json'),
];

var finalPackage = {
  name: 'react-workshop-dependencies',
  version: '1.0.0',
  description: 'Just a project to fetch all npm dependencies',
  dependencies: {},
  devDependencies: {}
};

packages.forEach(function(package) {
  Object.keys(package.dependencies).forEach(function(key) {
    finalPackage.dependencies[key] = package.dependencies[key];
  });
  Object.keys(package.devDependencies).forEach(function(key) {
    finalPackage.devDependencies[key] = package.devDependencies[key];
  });
});

console.log(JSON.stringify(finalPackage, null, 2));
