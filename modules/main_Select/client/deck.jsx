import React from 'react'
import {Link} from 'react-router'
import {GridTile} from 'material-ui'

let Deck = React.createClass({
  createShow: function (deck) {
    console.log('hi')
    Meteor.call('createDeck', deck.link, deck.gid, function (err, result){
      if (err) {
        throw new Error('cannot create deck', err)
      } else {
        console.log('created deck', result)
        Meteor.call('createShow', deck.gid, function (err, code) {
          if(err){
            throw new Error('Cannot create Show')
          } else {
            console.log('created!', code);
          }
        })      
      }
    })
  },
  render: function () {
    const {isReady, deck} = this.props
    const tile = {
      height: '15rem',
    }
    // call createDeck to download a new deck. (isReady) upon completion
    return (
      <GridTile
        title={deck.title}
        children={<img src={deck.thumbnail}/>}
        onClick={()=>this.createShow(deck)}
        style={tile}
      />
    )
  }
})

export default Deck
    
