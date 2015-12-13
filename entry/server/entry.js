// import server files here
import './../../methods/server.js'

import 'main_SelectPresentation/server';
import 'main_Presenter/server';

// Do server-rendering only in proudction mode
if (process.env.NODE_ENV === 'production') {
  // Load Webpack infos for SSR
  // ReactRouterSSR.LoadWebpackStats(WebpackStats);

  // require('../client/routes');
} else {
  // Add fixtures required for integration tests
  const context = require.context('../../modules', true, /\/server\/(.*)\/integration\/(.*)\-fixtures\.jsx?$/);
  context.keys().forEach(context);

  if (process.env.FRAMEWORK === 'jasmine-server-integration') {
    // Run integration tests on server
    const context = require.context('../../modules', true, /\/server\/(.*)\/integration\/(.*)\-test\.jsx?$/);
    context.keys().forEach(context);
  }
}
