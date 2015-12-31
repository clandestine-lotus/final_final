import PostsDB from 'db/Posts'

export default function (post) {
  post.createdAt = new Date()
  post.ownerId = this.userId

  if (this.userId) {
    PostsDB.insert(post)
  } else {
    throw new Meteor.Error('cant post!', 'not logged in!')
  }
}
