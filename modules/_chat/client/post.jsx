import React from 'react'
import { connect } from 'react-redux'
import Threads from 'db/Threads.js'

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
    return (
        <li>
          <span className="thread">
            <strong>{this.props.thread.name}</strong>: {this.props.thread.text} 
          </span>
          <div><button className="reply" onClick={this.expand}>Expand</button>    </div>
        </li>
        
        )
  }
})


// function selectState() {
//   // select presentationId
// }

// function selectReducers(){

// }

export default connect()(Post)
