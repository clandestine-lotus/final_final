/*
  This is the entry point. Export a react component here.
*/

import React from 'react';
import Presentations from 'db/Presentations.js'
import Thumbnail from './components/thumbnail'

let SidebarView = React.createClass({

  createThumbnails () {
    let pres = Presentations.findOne({gid: this.props.gid})
    let end = this.props.end + 1 ? this.props.end + 1 : pres.svgs.length
    let mapped = []
    console.log(end, 'what is the end', this.props.end)
    for(var i = 0; i < end; i++){
      mapped.push(<Thumbnail key={i} svg={pres.svgs[i]} index={i} setIndex={this.props.setIndex} gid={this.props.gid}/>)
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
