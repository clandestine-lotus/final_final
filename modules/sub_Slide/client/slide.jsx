import { connect } from 'react-redux'
import React from 'react'

let Slide = React.createClass({
  propTypes: {
    // optional to force slide to render a particular index
    slideIndex: React.PropTypes.number,
  },

  makeSlides: function (index) {
    return {
      __html: this.props.deck[index]
    }
  },

  render: function () {
    if (this.props.deck.length < 1 || this.props.showId.length < 5){
      return <div> Loading... </div>
    }
    // use passed in index if present
    let { currentIndex, slideIndex, maxIndex } = this.props
    let slideDiv

    if (slideIndex == undefined){
      // if the view is at the latest slide...
      // currently unused
      if (Meteor.userId() === this.props.ownerId){
        slideIndex = this.props.presenterIndex
      } else {
        slideIndex = currentIndex
      }
    }

    // prevent going beyond first slide
    if (slideIndex < 0) { slideIndex = 0 }

    // check if past last slide
    if (slideIndex >= this.props.numSlides) {
      slideDiv = <div>The presentation is over</div>
    } else {
      slideDiv = <div dangerouslySetInnerHTML={this.makeSlides(slideIndex)} />
    }

    return <div>{ slideDiv }</div>
  }

})

function selectState (state) {
  return {
    currentIndex: state.show.currentIndex,
    maxIndex: state.show.maxIndex,
    numSlides: state.show.numSlides,
    presenterIndex: state.show.presenterIndex,
    ownerId: state.show.ownerId,
    showId: state.show.showId,
    deck: state.deck,
  }
}

export default connect(selectState)(Slide)
