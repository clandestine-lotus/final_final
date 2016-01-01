import React from 'react'
import { connect } from 'react-redux'

// Mongo collections
import PostsDB from 'db/Posts'


// child directives
import Post from './post.jsx'

import { Card, CardText, List, TextField, IconButton, FontIcon, Styles } from 'material-ui'


/**
 *   if this is a reply and not top-level,
 *   expect props of: isReply === true, threadId
 */

let Posts = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData(){
    if (!this.props.isReply){
      Meteor.subscribe('posts', this.props.showId)
    }
    // if this a reply, get all the replies with 'threadId' as a prop
    let thread = {showId: this.props.showId, threadId: this.props.threadId || null}
    return {
      postsList: PostsDB.find(thread, {sort: {answered: 1, votes: -1}}).fetch(),
    }
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
    }
  },

  handleSubmit(event){
    event.preventDefault()
    let input = this.refs.threadInput
    let inputText = input.getValue()

    if (inputText.length > 1) {
      let post = {
        showId: this.props.showId,
        presenterId: this.props.presenterId,
        slideIndex: this.props.currentIndex,
        text: input.getValue(),
        ownerId: Meteor.userId(),
        name: Meteor.user().profile.name,
        votes: 0,
        answered: false,
        supporters: [],
        threadId: null,
      }
      if (this.props.isReply) {
        // add the threadID as a prop for replies to a question thread
        post.threadId = this.props.threadId
      }
      Meteor.call('createPost', post, function (err, res) {
        if (!err){
          input.clearValue()
        }
      })

    } else {
      // TODO: Add a snackbar message
    }
  },

  renderPosts() {
    return this.data.postsList.map((post) => {
      return <Post isProjector={this.props.isProjector} isReply={this.props.isReply} key={post._id} post={post} />
    })
  },

  render() {
    let form = null
    const { isReply, isProjector } = this.props

    // set the text input
    if (Meteor.userId() && !isProjector){
      const labelText = isReply ? 'Reply to this question' : 'Ask a question!'
      form = (
        <div>
          <Card>
            <CardText style={{'text-align': 'center'}}>
              <TextField ref="threadInput" floatingLabelText={labelText} onEnterKeyDown={this.handleSubmit} />
              <IconButton disabled={false} onClick={this.handleSubmit} onTapTouch={this.handleSubmit} style={this.styles.send} >
                <FontIcon hoverColor={Styles.Colors.cyan500} className="material-icons">
                  send
                </FontIcon>
              </IconButton>
            </CardText>
          </Card>
        </div>
      )
    } else {
      form = isReply || isProjector ? '' : 'Log in to ask Questions'
    }

    return (
      <List
        style={this.styles.list}
      >
        {this.renderPosts()}
        { form }
      </List>
    )
  }
})


function mapStateToProps (state) {
  return {
    showId: state.show.showId,
    presenterId: state.show.ownerId,
    currentIndex: state.show.currentIndex,
  }
}

export default connect(mapStateToProps)(Posts)
