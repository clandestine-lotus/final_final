// import all methods here (export must be a function)
import votes from './votes'
import ownerShowUpdate from './ownerShowUpdate'
import createPost from './createPost'
import questionAnswered from './questionAnswered'


// add to combined Meteor.methods, which will have the var name.
Meteor.methods({
  // addAudience,
  // createDeck,
  // createShow,
  ownerShowUpdate,
  // removeAudience,
  // updatePace,
  // updateUserCount,
  votes,
  createPost,
  questionAnswered,
})
