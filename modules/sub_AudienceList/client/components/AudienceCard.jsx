import React, {Component} from 'react';
import image from '../public/default.png'
export default class AudienceCard extends Component{
  
  render() {
    const question = this.props.user.question ? {background: 'green'} : {background: 'white'}
    return (
      <div style={question}>
        <img style={{height: '50px'}} src={this.props.user.thumbnail ? this.props.user.thumbnail : image}/>
        {this.props.user.name}
      </div>
    )
  }
}
