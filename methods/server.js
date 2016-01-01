// import all methods here (export must be a function)
import votes from './votes'
import ownerShowUpdate from './ownerShowUpdate'
import createDeck from './createDeck'
import createShow from './createShow'
import { updatePace, updateUserCount, addAudience, removeAudience } from './Audience'
import createPost from './createPost'
import questionAnswered from './questionAnswered'

// add to combined Meteor.methods, which will have the var name.
Meteor.methods({
  addAudience,
  createDeck,
  createShow,
  ownerShowUpdate,
  removeAudience,
  updatePace,
  updateUserCount,
  votes,
  createPost,
  questionAnswered,
})
