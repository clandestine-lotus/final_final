import React from 'react'

// Mongo collections
import PostsDB from 'db/Posts'

import './chat.scss'

// child directives
import Post from './post.jsx'

import { List, Divider, TextField } from 'material-ui'


/**
 *   if this is a reply and not top-level,
 *   expect props of: isReply true, threadId
 */

let Posts = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData(){
    if (!this.props.isReply){
      Meteor.subscribe('posts', this.props.presentationId)
    }
    // if this a reply, get all the replies with 'threadId' as a prop
    let thread = {presentationId: this.props.presentationId, threadId: this.props.threadId || null}
    return {postsList: PostsDB.find(thread, {sort: {votes: -1}}).fetch() }
  },

  styles: {
    list: {
      maxWidth: '100%',
    }
  },

  handleSubmit(event){
    event.preventDefault();
    let input = this.refs.threadInput;
    let post = {
      // TODO!
      // add presentationID
      presentationId: this.props.presentationId,
      text: input.value,
      createdAt: new Date(),
      ownerId: Meteor.userId(),
      name: Meteor.user().profile.name,
      votes: 0,
      supporters: [],
      threadId: null,
    }
    if (this.props.isReply) {
      // add the threadID as a prop for replies to a question thread
      post.threadId = this.props.threadId
    }
    Meteor.call('createPost', post)

    input.value = ''
  },

  renderPosts() {
    return this.data.postsList.map((post) => {
      console.log(post);

      return <Post isReply={this.props.isReply} key={post._id} post={post} />
    })
  },

  render() {
    let form = null
    const { isReply } = this.props

    // set the text input
    if (Meteor.userId()){
      const placehldr = isReply ? 'Reply to this question' : 'Ask a question!'
      form = (<form className="newThread chat" onSubmit={this.handleSubmit} >
      <input type="text" ref="threadInput" placeholder={ placehldr }/>
      </form>)
    } else {
      form = 'Log in to ask Questions'
    }

    return (
      <List
        style={this.styles.list}
      >
        { isReply ? null : <div>{ form }</div> }
        {this.renderPosts()}
        { isReply ? <div>{ form }</div> : null }
      </List>
    )
  }
})

export default Posts
