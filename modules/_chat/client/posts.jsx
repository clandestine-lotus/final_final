import React from 'react'
import { connect } from 'react-redux'

// Mongo collections
import Threads from 'db/Threads'
import Replies from 'db/Replies'

import './thread.scss'

// child directives
import Post from './post.jsx'

// Tracker.autorun(()=>
//   // {presentationId: }
//   Threads.findOne({}, )
//   )
// const ADD_THREAD = 'ADD_THREAD'
// const ADD_REPLY = 'ADD_REPLY'

// export function updateChat (obj) {
//   return { type: ADD_THREAD, text}
// }

/**
 *   if this is a reply and not top-level,
 *   expect props of: isReply true, threadId
 */

let Posts = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    let dbList;
    if (this.props.isReply){
      dbList = {
        dbList: Replies.find({thread: this.props.threadId}, {sort: {votes: -1}}).fetch()
      }
    } else {
      dbList = {
        // select by presentationId
        dbList: Threads.find({}, {sort: {votes: -1}}).fetch()
      }
    }
    return dbList
  },

  handleSubmit(event){
    event.preventDefault();
    let input = this.refs.threadInput;
    let post = {
      text: input.value,
      createdAt: new Date(),
      ownerId: Meteor.userId(),
      name: Meteor.user().profile.name,
      votes: 0
      // add presentationID
    }
    if (this.props.isReply) {
      post.thread = this.props.threadId
      Replies.insert(post)
    } else {
      Threads.insert(post)
    }
    input.value = ''
  },

  renderThreads(){
    return this.data.dbList.map((thread) => {
      return <Post isReply={this.props.isReply} key={thread._id} thread={thread} />
    })
  },

  render() {
    let form = null;
    if (Meteor.userId()){
      form = (<form className="newThread" onSubmit={this.handleSubmit} >
      <input type="text" ref="threadInput" placeholder="Add a question!"/>        
      </form>)
    } else {
      form = 'Log in to ask Questions'
    }
    return (
      <div>
        <div>
        { form }
        </div>
        <div>
          <ul>
          {this.renderThreads()}
          </ul>
        </div>
      </div>
      )
  }
})

// function selectState() {
//   // select presentationId
// }

// function selectReducers(){

// }

export default connect()(Posts)
