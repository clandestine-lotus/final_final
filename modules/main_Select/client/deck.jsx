import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {setShow} from 'dux/show'
import {GridTile} from 'material-ui'

let Deck = React.createClass({
  createShow: function (deck) {
    let {setShow} = this.props
    Meteor.call('createDeck', deck.link, deck.gid, function (err, result){
      if (err) {
        throw new Error('cannot create deck', err)
      } else {
        Meteor.call('createShow', deck.gid, function (err, code) {
          if(err){
            throw new Error('Cannot create Show')
          } else {
            setShow(code)
          }
        })      
      }
    })
  },
  render: function () {
    const {deck} = this.props
    const tile = {
      height: '15rem',
    }
    // call createDeck to download a new deck. (isReady) upon completion
    return (
      <GridTile
        title={deck.title}
        children={<img src={deck.thumbnail}/>}
        onClick={() => this.createShow(deck)}
        style={tile}
      />
    )
  }
})

function selectState (state) {
  return {}
}


export default connect(selectState, {setShow})(Deck)

    
