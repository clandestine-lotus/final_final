import { connect } from 'react-redux'
import React from 'react'
import $ from 'jquery'

let Slide = React.createClass({

  propTypes: {
    // optional to force slide to render a particular index
    slideIndex: React.PropTypes.number,
  },

  getInitialState () {
    // set initial state of refresh to true so transitions will go
    return {"refresh": true}
  },

  componentWillReceiveProps (nextProps) {
    // set refresh to whether there has been a change in either currentIndex or currentTransition
    let change = (nextProps.currentIndex === this.props.currentIndex && nextProps.currentTransition === this.props.currentTransition)
    this.setState({"refresh": !change})
  },

  componentDidUpdate () {
    let {transitions, currentIndex, currentTransition} = this.props
    if(this.state.refresh) {
      for(var i = 0; i < transitions[currentIndex].length; i++){
        // select element by id within slide component and set to hidden
        $('.slide').find('#' + transitions[currentIndex][i]).attr("visibility", "hidden")
      }
      if(currentTransition <= transitions[currentIndex].length) {
        for(var j = 0; j < currentTransition; j++){
          // select element by id within slide component and set visible up to current transition
          $('.slide').find('#' + transitions[currentIndex][j]).attr("visibility", "visible")
        }
      }
    }
  },

  makeSlides: function (index) {
    return {
      __html: this.props.deck[index]
    }
  },

  render: function () {
    let slideDiv

    // return a placeholder if store has not been hydrated
    if (this.props.deck.length < 1 || this.props.showId.length < 5){
      slideDiv = <div> Loading... </div>
    } else {

      let { currentIndex, slideIndex } = this.props

      // use passed in index if present
      if (slideIndex == undefined){ slideIndex = currentIndex }


      // prevent going beyond first slide (already checked in action)
      if (slideIndex < 0) { slideIndex = 0 }

      // check if past last slide (already checked in action)
      if (slideIndex >= this.props.numSlides) {
        slideDiv = <div>The presentation is over</div>
      } else {
        slideDiv = <div dangerouslySetInnerHTML={this.makeSlides(slideIndex)} />
      }
    }
    return <div className="slide">{ slideDiv }</div>
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
    currentTransition: state.show.currentTransition,
    transitions: state.transitions
  }
}

export default connect(selectState)(Slide)
