import React from 'react'
import { connect } from 'react-redux'
import Threads from 'db/Threads.js'
import { expand } from 'dux/chat'
import Posts from './posts.jsx'


// Tracker.autorun(()=>
//   // {presentationId: }
//   Threads.findOne({}, )
//   )
// const ADD_THREAD = 'ADD_THREAD'
// const ADD_REPLY = 'ADD_REPLY'

// export function updateChat (obj) {
//   return { type: ADD_THREAD, text}
// }

let Post = React.createClass({
  
  render(){
    const { dispatch, expandId, thread } = this.props
    return (
        <li>
          <span className="thread">
            <strong>{thread.name}</strong>: {thread.text} 
          </span>
          <div>
          { this.props.isReply ? 
            '' : 
            <button className="reply" onClick={ () => dispatch(expand(thread._id, expandId)) } >Expand</button> }
          </div>
          { expandId === thread._id ?
            <ul>
              <Posts isReply threadId={expandId}/>
            </ul>
            : ''}
        </li>

        )
  }
})


function selectState(state) {
  return {
    // select presentationId
    expandId: state.chat.id
  }
}

// function selectReducers(dispatch){
//   return {
//     dispatchExpand: id => dispatch(require('dux/chat').expand(id))
//   }
// }

export default connect(selectState)(Post)
