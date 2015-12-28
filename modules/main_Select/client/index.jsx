/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import DecksDB from 'db/Decks'
import { getPreviews } from 'dux/deckPicker'
import Deck from './deck'


import { GridList, GridTile, CircularProgress } from 'material-ui'
// TODO: Use theming to pick colors
import { Colors } from 'material-ui/styles'


let SelectPresentation = React.createClass({
  mixins: [ReactMeteorData],

  componentDidMount() {
    this.props.getPreviews()
  },

  componentDidUpdate() {
    // Fixes dialog's padding-top not being set correctly
    window.dispatchEvent(new Event('resize'))
  },

  getMeteorData(){
    return {DecksList: DecksDB.find({ownderId: Meteor.userId()}, {fields: {gid: 1}}).fetch() }
  },

  renderDecks(){
    let isReady = gid => {
      if (this.data.DecksList.length) {
        // return arr of gids
        let gidArr = this.data.DecksList.map(function (obj) {
          return obj.gid
        })

        // check if gidArr is in the localDB
        return gidArr.indexOf(gid) !== -1
      } else {
        // not in the db for sure
        return false
      }
    }
    return this.props.previews.map((deck) => {
      return <Deck key={deck.gid} isReady={isReady(deck.gid)} deck={deck} />
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
    previews: state.previews
  }
}

export default connect(mapStateToProps, {getPreviews})(SelectPresentation)

