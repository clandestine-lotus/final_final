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
    // use passed in index if present
    let { currentIndex, slideIndex } = this.props
    let slideDiv

    if (slideIndex == undefined){
      // if the view is at the latest slide...
      // currently unused
      if (currentIndex === maxIndex){
        slideIndex = this.props.maxIndex
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

    return { slideDiv }
  }

})

function selectState (state) {
  return {
    currentIndex: this.state.show.currentIndex,
    maxIndex: this.state.show.maxIndex,
    numSlides: this.state.show.numSlides,
    presenterIndex: this.state.show.presenterIndex,
    ownerId: this.state.show.ownerId,
    showId: this.state.show.showId,
    deck: this.state.deck,
  }
}

export default connect(selectState)(Slide)
