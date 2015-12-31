import React from 'react'
import { connect } from 'react-redux'
import { expand } from 'dux/chat'
import Posts from './posts.jsx'

import {
  Badge, IconButton, FontIcon, RaisedButton,
  Card, CardHeader, CardActions, CardText,
  Styles } from 'material-ui'


let Post = React.createClass({
  hasVoted: false,

  style: {
    badge: {
      padding: '0',
      width: '100%',
    },
    card: {
      width: '100%'
    },
    noTopBotPad: {
      paddingTop: '0',
      paddingBottom: '0',
    },
    name: {
      margin: '0',
    }
  },

  acceptAnswer(e) {
    e.stopPropagation()
    console.log('accepted!')
  },

  upvote() {
    Meteor.call('votes', this.props.post._id, 1)
    this.hasVoted = true
  },

  render() {
    const { dispatch, expandId, post } = this.props

    const previewText = post.text.length > 30 ? post.text.substr(0, 30) + '...' : post.text

    return (
      <div>
        <Badge
          className="badgeContainer"
          badgeContent={'+' + post.votes}
          secondary
          style={this.style.badge}
          children={
            <Card
              initiallyExpanded={this.props.isReply}
              style={this.style.card}
              onExpandChange={() => dispatch(expand(post._id, expandId))}
            >
              <CardHeader
                title={
                  <h5
                    style={this.style.name}
                  >{post.name}:
                  </h5>}
                subtitle={this.props.isReply ? null : previewText}
                avatar={
                  <IconButton
                    tooltip="Upvote"
                    disabled={post.supporters.indexOf(Meteor.userId()) !== -1}
                    onClick={this.upvote}
                    onTapTouch={this.upvote}
                  ><FontIcon
                    hoverColor={Styles.Colors.cyan500}
                    className="material-icons"
                  >thumb_up</FontIcon>
                  </IconButton>
                }
                actAsExpander={!this.props.isReply}
                showExpandableButton={!this.props.isReply}
                style={this.style.noTopBotPad}
              />
              <CardText
                expandable
                style={this.style.noTopBotPad}
              >
                {post.text}
              </CardText>
              <CardText
                expandable
                style={this.style.noTopBotPad}
              >
                {
                  expandId === post._id ?
                  <Posts isReply threadId={expandId}/>
                  : null
                }
              </CardText>
              {
                this.props.isReply ?
                  <CardActions>
                    <RaisedButton
                      label="Accept as Best"
                      onClick={this.acceptAnswer}
                      onTapTouch={this.acceptAnswer}
                    />
                  </CardActions>
                  : <RaisedButton // TODO: hide this button when expanded
                    label="Expand"
                    actAsExpander
                  />
                }
            </Card>
          }
        />
      </div>
    )
  }
})

function selectState(state) {
  return {
    // select presentationId
    expandId: state.chat.id
  }
}

export default connect(selectState)(Post)
