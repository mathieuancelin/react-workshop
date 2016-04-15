/* eslint no-unused-vars:0, no-console: 0 */

import { bootstrapEnv } from './bootstrap';

bootstrapEnv();

require('./components/regions.spec.js')
require('./components/wine-list.spec.js')
require('./components/wine.spec.js')
require('./components/wine-app.spec.js')
