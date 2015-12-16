import React from 'react'
import { connect } from 'react-redux'
import { expand } from 'dux/chat'
import Posts from './posts.jsx'

let Post = React.createClass({
  hasVoted: false,
  upvote(){
    Meteor.call('votes', this.props.post._id, 1)
    this.hasVoted = true
  },

  render(){
    let voteBtn;
    const { dispatch, expandId, post } = this.props
    if (post.supporters.indexOf(Meteor.userId()) !== -1){
      voteBtn = ''
    } else {
      voteBtn = <button className="upvote" onClick={ this.upvote }> +1 </button> 
    }
    return (
        <li>
          <span className="post">
            +{post.votes} <strong>{post.name}</strong>: {post.text} 
          </span>
          <div>
          { this.props.isReply ? 
            '' : 
            <button className="reply" onClick={ () => dispatch(expand(post._id, expandId)) } >Expand</button> }
            { voteBtn }
          </div>
          { expandId === post._id ?
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
