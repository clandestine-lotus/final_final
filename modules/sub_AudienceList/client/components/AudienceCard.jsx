import React, {Component} from 'react'
import image from '../public/default.png'

import { ListItem, Avatar } from 'material-ui'

export default class AudienceCard extends Component{

  render() {
    const question = this.props.user.question ? {background: 'green'} : {background: 'white'}

    return (
      <ListItem
        style={question}
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
}
