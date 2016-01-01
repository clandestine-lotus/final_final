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

// AUTOPUBLISHED: get recent codes, <24h old
Meteor.publish('', function () {
  let d = new Date()
  // TODO: change date to -1
  d.setDate(d.getDate() - 10)
  return Codes.find({createdAt: {$gt: d}}, {sort: {createdAt: -1}, limit: 300})
})

// AUTOPUBLISHED: user info for logged in user
Meteor.publish('', function () {
  return Meteor.users.find(this.userId)
})

// gets one deck from id or gid
Meteor.publish('deck', function (id) {
  return Decks.find({$or: [{_id: id}, {gid: id}]})
})

// gets all decks belonging to one owner
Meteor.publish('ownerDecks', function () {
  return Decks.find({ownerId: this.userId})
})

// get codes from a specific user
Meteor.publish('codes', function () {
  return Codes.find({ownerId: this.userId})
})

// get show from _id
Meteor.publish('show', function (id) {
  return Shows.find(id)
})

// get Q&A from a show
Meteor.publish('posts', function (showId) {
  return Posts.find({showId: showId})
})

// get Audience list
Meteor.publish('audience', function (show) {
  return Audience.find({presentation: show})
})

//////////////
// DB RULES //
//////////////

// checks if user is logged in, and the doc in question is has the same ownerId
let ownerChange = function (userId, doc) {
  return (userId && doc.ownerId === userId)
}

// allow client-side db updates from logged in users
Posts.allow({
  insert: ownerChange,
  update: ownerChange,
  remove: ownerChange
})

