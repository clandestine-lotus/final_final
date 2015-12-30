import React from 'react'
import image from '../public/default.png'

import { ListItem, Avatar } from 'material-ui'


export default React.createClass({

  render() {
    const question = this.props.user.question ? {background: 'green'} : {background: 'white'}

    return (
      <ListItem
        style={question}
        disabled
        leftAvatar={
          <Avatar
            src={this.props.user.thumbnail || image}
          />
        }
      >
      {this.props.user.name}
      </ListItem>
    )
  }
})
