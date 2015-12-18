import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import DecksDB from 'db/Decks'
import { getPreviews } from 'dux/deckPicker'

let Deck = React.createClass({
  render: function () {
    const {isReady, deck} = this.this.props
    return (
      <div onClick>
        <img src={deck.thumbnail} />
        <h2>{deck.title}</h2>
      </div>
      )
  }
})

let Decks = React.createClass({
  mixins: [ReactMeteorData],
  
  componentDidMount: function () {
    this.props.getPreviews();
  },

  getMeteorData(){
    // if this a reply, get all the replies with 'threadId' as a prop
    let thread = {presentationId: this.props.presentationId, threadId: this.props.threadId || null}
    return {DecksList: DecksDB.find({ownerId: Meteor.userId()}, {fields: {gid: 1}}).fetch() }
  },


  renderDecks(){
    return this.props.previews((deck) => {
      return <Deck isReady={DecksList.gid.indexOf(deck.gid) !== -1} deck={deck} />
    })
  },

  render: function () {
    const { previews } = this.props
    return (
      <div>
        <header><h1>Select a Deck</h1></header>
        <ul>
          {this.renderDecks()}
        </ul>
      </div>
      )
  }
})

function selectState (state) {
  return {
    previews: state.deckPicker
  }
}

export default connect(selectState, {getPreviews})(Decks)
