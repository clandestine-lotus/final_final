import React from 'react'
import { connect } from 'react-redux'

// Mongo collections
import PostsDB from 'db/Posts'


// child directives
import Post from './post.jsx'

import { GridList, GridTile } from 'material-ui'

const style = {
  fullsize: {
    'width': '100%',
    'height': '160px',
  }
}

/**
 *   if this is a reply and not top-level,
 *   expect props of: isReply === true, threadId
 */

let Grid = React.createClass({
  mixins: [ReactMeteorData],

  componentDidUpdate() {
    window.dispatchEvent(new Event('resize'))
  },

  getMeteorData() {
    if (!this.props.isReply){
      Meteor.subscribe('posts', this.props.showId)
    }
    // if this a reply, get all the replies with 'threadId' as a prop
    let thread = {showId: this.props.showId, threadId: null}
    return {
      postsList: PostsDB.find(thread, {sort: {answered: 1, votes: -1}}).fetch(),
    }
  },


  renderPosts() {
    return this.data.postsList.map((post) => {
      return (
        <GridTile>
          <Post style={style.fullsize} isProjector={this.props.isProjector} key={post._id} post={post} />
        </GridTile>
      )
    })
  },

  render() {
    return (
      <div>
        {
          this.data.postsList.map((post) => {
            return (
              <Post isProjector={this.props.isProjector} key={post._id} post={post} />
            )
          })
        }
      </div>
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

export default connect(mapStateToProps)(Grid)
