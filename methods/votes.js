import PostsDB from 'db/Posts'

export default (id, count) => {
  count = count || 1

  if (this.userId) {
    PostsDB.update({_id: id}, {$inc: {votes: count}, $push: {supporters: this.userId}})
  }
}
