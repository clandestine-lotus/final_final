import React from 'react'

let Deck = React.createClass({
  createShow: function (gid) {
    Meteor.call('createShow', gid, function (err, showId) {
      if(err){
        throw new Error('Cannot create Show')
      } else {
        console.log('created!');
      }
    })
  },
  render: function () {
    const {isReady, deck} = this.props
    // call createDeck to download a new deck. (isReady) upon completion
    return (
      <div onClick={() => Meteor.call('createDeck', deck.link, deck.gid)}>
        <h2>{deck.title}</h2>
        <img src={deck.thumbnail} />
        { isReady ? <button onClick={() => this.createShow(deck.gid)}>Start a show</button> : <div>Not lodaded</div>}
      </div>
      )
  }
})

export default Deck