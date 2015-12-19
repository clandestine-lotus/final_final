import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import DecksDB from 'db/Decks'
import { getPreviews } from 'dux/deckPicker'

let Deck = React.createClass({
  createShow: function (gid) {
    Meteor.call('createShow', gid, function (err, showId) {
      if(err){
        console.log('cannot create show');
        console.log(err);
      } else {
        console.log('created!');
      }
    })
  },
  render: function () {
    const {isReady, deck} = this.props
    return (
      <div onClick={() => Meteor.call('createDeck', deck.link, deck.gid)}>
        <h2>{deck.title}</h2>
        <img src={deck.thumbnail} />
        { isReady ? <button onClick={() => this.createShow(deck.gid)}>Start a show</button> : <div>Not lodaded</div>}
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
    return {DecksList: DecksDB.find({ownerId: Meteor.userId()}, {fields: {gid: 1}}).fetch() }
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

  render: function () {
    // const { previews } = this.props
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
