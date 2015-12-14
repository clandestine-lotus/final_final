/*
  Speedometer is a slider which represents how the audience feels about the pace of the presentation.

  Expects "speed" (num between 0 and 1) as a prop.
*/

import React from 'react';

export const Slider = React.createClass({
  // propTypes: {
  //   speed: React.PropTypes.number
  // },

  pickColor(speed) {
    const distFromCenter = Math.floor(Math.abs(speed - 0.5) * 18);

    switch (distFromCenter) {
    case 0:
      return '#58D058';
    case 1:
      return '#73D056';
    case 2:
      return '#8ED055';
    case 3:
      return '#ABD053';
    case 4:
      return '#C9D052';
    case 5:
      return '#D1BA50';
    case 6:
      return '#D19C4F';
    case 7:
      return '#D17D4D';
    case 8:
      return '#D15C4C';
    case 9:
      return '#D14A59';
    default:
      return '#58D058';
    }
  },

  render() {
    const speed = this.props.speed === undefined ? 0.5 : this.props.speed;

    const color = this.pickColor(speed);

    const sliderStyle = {
      position: 'relative',
      width: '100%',
      borderTop: '2px solid ' + color,
      color: color,
      lineHeight: '.7em',
      padding: '0',
      margin: '0',
    }

    const cursorStyle = {
      color: color,
      width: '0',
      height: '0',
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderBottom: '7px solid ' + color,
      position: 'absolute',
      left: (speed * 100) + '%',
      transform: 'translateX(-50%)'
    }

    return (
      <div>
        <div style={sliderStyle}>
          <div style={cursorStyle}></div>
        </div>
      </div>
    )
  }
})

