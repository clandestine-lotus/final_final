import React from 'react'

let Thumbnail = React.createClass({
  setThumb () {
    return { __html: this.props.svg}
  },

  changeSlide () {
    return this.props.setIndex(this.props.index)()
  },

  render() {
    return (
      <div className="thumbnail" onClick={this.changeSlide} dangerouslySetInnerHTML={this.setThumb()}></div>
    );
  }
})


function selectState (state) {
  return {}
}


export default connect(selectState, actionCreators)(Thumbnail)
