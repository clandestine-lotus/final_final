// import global styles
import 'css/global.scss'

// import Meteor Methods for optimistic updates
import './../../methods/client.js'


import 'main_SelectPresentation/client';
import 'main_Presenter/client';

/*eslint-disable*/
import ReactDOM from 'react-dom'; // ESLINT: unused var
import React from 'react'; // ESLINT: unused var
/*eslint-enable*/

import './root';

// set scope for google auth to include drive access
// TODO: access drive as read-only
var scopes = ['https://www.googleapis.com/auth/drive'];

Accounts.ui.config({
  'passwordSignupFields': 'USERNAME_ONLY',
  'requestPermissions': { 'google': scopes },
  // TODO: figure out how to actually make tokens refreshify
  'requestOfflineToken': { 'google': true }
});

// uncomment to enable tests
// if (process.env.NODE_ENV !== 'production') {
//   if (process.env.FRAMEWORK === 'jasmine-client-integration') {
//     // Run the integration tests on the mirror
//     const context = require.context('../../modules', true, /\/client\/(.*)\/integration\/(.*)\-test\.jsx?$/);
//     context.keys().forEach(context);
//   } else {
//     // Run unit tests on client
//     const context = require.context('../../modules', true, /\/client\/(.*)\/unit\/(.*)\-test\.jsx?$/);
//     context.keys().forEach(context);
//   }
// }
