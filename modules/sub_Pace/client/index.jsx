/*
  Speedometer is a slider which represents how the audience feels about the pace of the presentation.

  Expects "speed" (num between 0 and 1) as a prop.
*/

import React from 'react';

export const Pace = React.createClass({
  propTypes: {

  },

  onChange: function (e) {
    console.log(e.target.value);

  },

  render() {
    return (
      <div>
        <input type="range" id="myRange" defaultValue="90" onChange={this.onChange}/>
      </div>
    )
  }
})
        // <ReactSlider
        //   defaultValue= {50}
        //   orientation= "horizontal"
        //   minDistance= {10}
        //   onChange= {this.onChange} />
          // value= {this.state.value}

