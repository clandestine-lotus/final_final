// import all methods here (export must be a function)
import doSomething from './method1'
import changeIndex from './changeIndex'
import createPresentation from './createPresentation'
import createSharingCode from './createSharingCode'
import votes from './votes'
import onConnection from './onConnection'

// add to combined Meteor.methods, which will have the var name.
Meteor.methods({
  createPresentation, 
  changeIndex,
  createSharingCode,
  votes,
  onConnection
})
