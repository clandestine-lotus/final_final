import React from 'react'
import { connect } from 'react-redux'
import Threads from 'db/Threads.js'
import './thread.scss'
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


let Chat = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      // select by presentationId
      threads: Threads.find({}, {sort: {votes: -1}}).fetch()
    }
  },

  handleSubmit(event){
    event.preventDefault();
    let input = this.refs.threadInput;
    let post = {
      text: input.value,
      createdAt: new Date(),
      ownerId: Meteor.userId(),
      name: Meteor.user().profile.name,
      votes: 0,
      replies: []
      // add presentationID
    }
    Threads.insert(post)
    input.value = ''
  },

  renderThreads(){
    return this.data.threads.map((thread) => {
      return <Post key={thread._id} thread={thread} />
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

export default connect()(Chat)
