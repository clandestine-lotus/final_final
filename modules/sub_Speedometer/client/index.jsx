/*
  Speedometer is a slider which represents how the audience feels about the pace of the presentation.

  Expects "speed" (num between -1 and 1) as a prop.
*/

import React from 'react'

import { trackSpeed } from 'dux/PaceReductions'

import Audience from 'db/Audience'

// TODO: fix this to find the right presentation id when the time comes.
const TODO_PRESENTATION_ID = 1

let speedometerObjects = {}

export const Speedometer = React.createClass({
  propTypes: {
    speed: React.PropTypes.number,
    showId: React.PropTypes.string,
    viewers: React.PropTypes.number
  },

  componentDidMount() {
    // track changes in show speed from DB  
    this.trackSpeed = trackSpeed(this.props.showId)
    // speedometerObjects.watch = Audience.find({presId: TODO_PRESENTATION_ID}).observe({
    //   changed: function (id, doc) {
    //     console.log('speedometer:', doc.rawSpeed, doc.numUsers, doc.rawSpeed / doc.numUsers);

    //     // this.props.speed = doc.rawSpeed / doc.numUsers
    //   }
    // })
  },

  componentWillUnmount() {
    this.trackSpeed.stop()
    // speedometerObjects.watch.stop();
  },

  pickColor(speed) {
    const distFromCenter = Math.floor(Math.abs(speed) * 10);

    const distColors = {
      1: '#58D058',
      2: '#73D056',
      3: '#8ED055',
      4: '#ABD053',
      5: '#C9D052',
      6: '#D1BA50',
      7: '#D19C4F',
      8: '#D17D4D',
      9: '#D15C4C',
      10: '#D14A59',
    }

    return distColors[distFromCenter] || '#58D058';
  },

  render() {
    const speed = this.props.speed === undefined ? 0 : this.props.speed;


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
      left: (speed + 1) * 50 + '%',
      transform: 'translateX(-50%)'
    }

    return (
      <div>
        <div style={sliderStyle}>
          <div style={cursorStyle}></div>
        </div><br />
      </div>
    )
  }
})

