/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Deck from './deck'
import { getPreviews } from 'dux/deckPicker'

import { GridList, CircularProgress } from 'material-ui'
// TODO: Use theming to pick colors
import { Colors } from 'material-ui/styles'


let SelectPresentation = React.createClass({

  componentDidMount() {
    this.props.getPreviews()
  },

  componentDidUpdate() {
    // Fixes dialog's padding-top not being set correctly
    window.dispatchEvent(new Event('resize'))
  },

  renderDecks(){
    return this.props.previews.map((deck) => {
      console.log(deck);

      return <Deck key={deck.gid} deck={deck} key={deck.gid} />
    })
  },

  render() {

    const progress = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }

    if (this.props.previews.length) {
      return (
        <GridList className="twelve columns"
          padding={8}
          cols={3}
        >
          {this.renderDecks()}
        </GridList>
      )
    } else {
      return <CircularProgress mode="indeterminate" size={1} style={progress} />
    }
  }
})

function mapStateToProps (state) {
  return {
    previews: state.previews,
    showCode: state.show.showCode
  }
}

export default connect(mapStateToProps, {getPreviews})(SelectPresentation)

