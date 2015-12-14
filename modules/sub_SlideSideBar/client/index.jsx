/*
  This is the entry point. Export a react component here.
*/

import React from 'react';
import Presentations from '../../main_SelectPresentation/globals/collections'
import Thumbnail from './components/thumbnail'

let SidebarView = React.createClass({

  render() {
    const sidebarStyle = {
      width: '10%',
      height: '50%',
      overflowY: 'scroll'
    }
    return (
      <div style={sidebarStyle}>{Presentations.findOne({gid: this.props.gid}).svgs.map((slide, i) => {
        return <Thumbnail key={i} svg={slide} index={i} setIndex={this.props.setIndex} gid={this.props.gid}/>
      })}</div>
    )
  }
})

export default SidebarView
