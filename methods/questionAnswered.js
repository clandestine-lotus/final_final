import PostsDB from 'db/Posts'

export default function (threadId, text) {
  const post = PostsDB.findOne(threadId)
  
  if (this.userId === post.ownerId || this.userId === post.presenterId) {
    PostsDB.update(threadId, {$set: {answered: true, answer: text || null}})
  } else {
    throw new Meteor.Error('no permissions', 'user is not presenter or poster')
  }
}
