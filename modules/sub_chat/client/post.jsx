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

  accepted: false,

  style: {
    badge: {
      // display: 'inline',
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

  liClickHandler(e) {
    console.log('li clicked');
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
                    hoverColor={Styles.Colors.cyan500}
                  ><FontIcon
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
                    <RaisedButton label="Accept as Best"/>
                  </CardActions>
                  : <RaisedButton
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

// function selectReducers(dispatch){
//   return {
//     dispatchExpand: id => dispatch(require('dux/chat').expand(id))
//   }
// }

export default connect(selectState)(Post)

    // return (
    //   <div>
    //     <Badge
    //       className="badgeContainer"
    //       badgeContent={'+' + post.votes}
    //       secondary
    //       style={this.style.badge}
    //       children={
    //         <Paper
    //           z-index={1}
    //         >
    //           <ListItem
    //             autoGenerateNestedIndicator
    //             leftAvatar={
    //               <IconButton
    //                 tooltip="Accept answer"
    //                 onClick={this.acceptAnswer}
    //                 onTapTouch={this.acceptAnswer}
    //               ><FontIcon
    //                 hoverColor={Styles.Colors.cyan500}
    //                 className="material-icons"
    //               >check</FontIcon>
    //               </IconButton>
    //             }
    //             rightIconButton={
    //               <IconButton
    //                 tooltip="Upvote"
    //                 disabled={post.supporters.indexOf(Meteor.userId()) !== -1}
    //                 onClick={this.upvote}
    //                 onTapTouch={this.upvote}
    //                 hoverColor={Styles.Colors.cyan500}
    //               ><FontIcon
    //                 className="material-icons"
    //               >thumb_up</FontIcon>
    //               </IconButton>
    //             }
    //             primaryText={post.name}
    //             secondaryText={
    //               post.text
    //             }
    //             secondaryTextLines={2}
    //             initiallyOpen={false}
    //             onClick={this.liClickHandler}
    //             style={this.style.listItem}
    //             nestedItems={[<div>Hello</div>]}
    //           />
    //         </Paper>
    //       }
    //     />
    //   </div>
    // )
