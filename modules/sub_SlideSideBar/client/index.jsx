/*
  This is the entry point. Export a react component here.
*/
import React from 'react';

import Thumbnail from './components/thumbnail'

let SidebarView = React.createClass({

  createThumbnails () {
    let mapped = []
    for(var i = 0; i < this.props.end; i++){
      mapped.push(<Thumbnail key={i} svg={this.props.deck[i]} index={i} setIndex={this.props.setIndex} gid={this.props.gid}/>)
    }
    return mapped;
  },

  render() {
    const sidebarStyle = {
      width: '10%',
      height: '50%',
      overflowY: 'scroll'
    }
    return (
      <div style={sidebarStyle}>{this.createThumbnails()}</div>
    )
  }
})

export default SidebarView
