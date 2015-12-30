// all collections must be included here to be usable
import Posts from './Posts.js'
import Audience from './Audience.js'
import Shows from './Shows.js'
import Decks from './Decks.js'
import Codes from './Codes.js'

const mongoCollections = {
  Posts, 
  Audience,
  Shows,
  Decks,
  Codes,
}

////////////////////
// PUBLISHED DATA //
////////////////////

// gets one deck from id or gid
Meteor.publish('deck', function (id) {
  return Decks.find({$or: [{_id: id}, {gid: id}]})
})

// gets all decks belonging to one owner
Meteor.publish('ownerDecks', function () {
  return Decks.find({ownerId: this.userId})
})

// get recent codes, <24h old
Meteor.publish('codes', function () {
  let d = new Date()
  d.setDate(d.getDate() - 1)
  return Codes.find({createdAt: {$gt: d}})
})

// get show from _id
Meteor.publish('show', function (id) {
  return Shows.find(id)
})

// get Q&A from a show
Meteor.publish('posts', function (showId) {
  return Posts.find({presentationId: showId})
})
