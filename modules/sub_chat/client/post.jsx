import React from 'react'
import { connect } from 'react-redux'
import { expand } from 'dux/chat'
import Posts from './posts.jsx'

import {Badge, Card, CardActions, CardText, FlatButton } from 'material-ui'

const style = {
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
  noBotPad: {
    paddingBottom: '0',
    margin: '0',
  },
  name: {
    margin: '0',
  }
}

let Post = React.createClass({

  // fires when answer has been selected
  acceptAnswer(e) {
    e.stopPropagation()
    if(this.props.post.threadId) {
      Meteor.call('questionAnswered', this.props.post.threadId, this.props.post.text)
    } else {
      Meteor.call('questionAnswered', this.props.post._id, null)
    }
  },

  upvote() {
    Meteor.call('votes', this.props.post._id, 1)
  },

  render() {
    const { isReply, dispatch, expandId, post } = this.props

    // check who the current user is
    const isPresenter = post.presenterId === Meteor.userId()
    const isPoster = post.ownerId === Meteor.userId()

    const Upvote = (<FlatButton
      label="UPVOTE"
      primary
      disabled={!Meteor.userId() || isPoster || post.supporters.indexOf(Meteor.userId()) !== -1}
      onClick={this.upvote}
      onTapTouch={this.upvote}
    />)

    const Answer = (!isReply && !isPresenter ? <a></a> :
      <FlatButton
        secondary
        label={'Bazinga!'}
        disabled={!Meteor.userId() || (!isPresenter && isReply)}
        onClick={this.acceptAnswer}
        onTapTouch={this.acceptAnswer}
      />)


    const PostText = (<h6 style={style.noBotPad}><b>{post.text}</b></h6>)
    const PostName = (<sup style={style.noTopBotPad}><i>-{post.name} </i></sup>)
    const AnswerText = (post.answer && post.answer.length > 1 ?
      <h7>A: {post.answer} </h7>
      : <b></b>)

    return (
      <div>

        <Badge
          className="badgeContainer"
          badgeContent={'+' + post.votes}
          secondary
          style={style.badge}
        >

          <Card
            initiallyExpanded={this.props.isReply}
            onExpandChange={() => dispatch(expand(post._id, expandId))}
          >

            <CardText style={style.noBotPad}
              actAsExpander={!this.props.isReply}
              showExpandableButton={!this.props.isReply && !this.props.isProjector}
            >

              {PostText}
              {PostName}

            </CardText>

            {!post.answered ? '' :
              <CardText style={style.noBotPad} actAsExpander={!this.props.isReply} >
                {AnswerText}
              </CardText>
            }

            {this.props.isProjector ? '' :
              <CardActions>
                {Upvote}{Answer}
              </CardActions>
          }

              {this.props.isProjector || isReply ? '' :
                  <CardText expandable style={style.noTopBotPad} >
                    { <Posts isReply threadId={post._id}/> }
                  </CardText>
              }

            </Card>
        </Badge>
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
