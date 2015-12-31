import React from 'react'

// Mongo collections
import PostsDB from 'db/Posts'

import './chat.scss'

// child directives
import Post from './post.jsx'

import { List, TextField, IconButton, FontIcon, Styles } from 'material-ui'


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
    },
    input: {
      width: '90%',
    },
    send: {
      width: '10%',
      color: Styles.Colors.cyan500
    }
  },

  handleSubmit(event){
    event.preventDefault()
    // let input = TextField.getValue()

    let input = this.refs.threadInput

    console.log(input);


    let post = {
      // TODO!
      // add presentationID
      presentationId: this.props.presentationId,
      text: input.getValue(),
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

    input.clearValue()
  },

  renderPosts() {
    return this.data.postsList.map((post) => {
      return <Post isReply={this.props.isReply} key={post._id} post={post} />
    })
  },

  render() {
    let form = null
    const { isReply } = this.props

    // set the text input
    if (Meteor.userId()){
      const labelText = isReply ? 'Reply to this question' : 'Ask a question!'
      // form = (
      //   <form className="newThread chat" onSubmit={this.handleSubmit} >
      //     <input type="text" ref="threadInput" placeholder={ placehldr }/>
      //   </form>
      // )
      form = (
        <div>
          <TextField
            ref="threadInput"
            floatingLabelText={labelText}
            underlineStyle={{borderColor: Styles.Colors.cyan500}}
            onEnterKeyDown={this.handleSubmit}
          />
          <IconButton
            disabled={false}
            onClick={this.handleSubmit}
            onTapTouch={this.handleSubmit}
            style={this.styles.send}
          ><FontIcon
            className="material-icons"
          >send</FontIcon>
          </IconButton>
      </div>
      )
    } else {
      form = 'Log in to ask Questions'
    }

    return (
      <List
        style={this.styles.list}
      >
        { isReply ? null : form }
        {this.renderPosts()}
        { isReply ? form : null }
      </List>
    )
  }
})

export default Posts
