import React from 'react'
import {connect} from 'react-redux'

import * as actionCreators from 'dux/show'

let Thumbnail = React.createClass({
  setThumb () {
    return { __html: this.props.svg}
  },

  render() {
    const {setIndex} = this.props
    return (
      <div className="thumbnail" onClick={() => setIndex(this.props.index)} dangerouslySetInnerHTML={this.setThumb()}></div>
    );
  }
})


function selectState (state) {
  return {}
}


export default connect(selectState, actionCreators)(Thumbnail)
