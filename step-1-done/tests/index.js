/* eslint no-unused-vars:0, no-console: 0 */

import { bootstrapEnv } from './bootstrap';

bootstrapEnv();

console.log('===================================================================\n');
console.log('If you want to run other tests, don\'t forget ton include them in the "tests" array.');
console.log('of $ROOT/tests/index.js)');
console.log('\n===================================================================\n');

const tests = [
  require('./components/wine.spec.js')
];
