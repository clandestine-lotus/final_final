import React from 'react';
import Presentations from '../../../main_SelectPresentation/globals/collections'


let Thumbnail = React.createClass({
  setThumb () {
    return { __html: this.props.svg}
  },

  changeSlide () {
    this.props.setIndex(this.props.index)
  },

  render() {
    return (
      <div className="thumbnail" onClick={this.changeSlide} dangerouslySetInnerHTML={this.setThumb()}></div>
    );
  }
})


export default Thumbnail
