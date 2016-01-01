import PostsDB from 'db/Posts'

export default function (post) {
  post.createdAt = new Date()
  post.ownerId = this.userId

  if (this.userId && post.text.length > 1) {
    PostsDB.insert(post)
  } else {
    throw new Meteor.Error('cant post!', 'blank or not logged in!')
  }
}
