import React from 'react';
import Presentations from 'db/Presentations'


let Thumbnail = React.createClass({
  setThumb () {
    return { __html: this.props.svg}
  },

  changeSlide () {
    this.props.setIndex(this.props.index, this.props.gid)
  },

  render() {
    return (
      <div className="thumbnail" onClick={this.changeSlide} dangerouslySetInnerHTML={this.setThumb()}></div>
    );
  }
})


export default Thumbnail
