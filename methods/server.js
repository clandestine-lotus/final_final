// import all methods here (export must be a function)
import changeIndex from './changeIndex'
import createPresentation from './createPresentation'
import createSharingCode from './createSharingCode'
import votes from './votes'
import ownerShowUpdate from './ownerShowUpdate'
import createDeck from './createDeck'
import createShow from './createShow'


// add to combined Meteor.methods, which will have the var name.
Meteor.methods({
  createPresentation, 
  changeIndex,
  createSharingCode,
  votes,
  ownerShowUpdate,
  createDeck,
  createShow,
})

