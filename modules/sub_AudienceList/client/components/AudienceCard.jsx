import React, {Component} from 'react';

export default class AudienceCard extends Component{
  
  render() {
    const question = this.props.user.question ? {background: 'green'} : {background: 'white'}
    return (
      <div style={question}>
        <img style={{height: '50px'}} src={this.props.user.picture}/>
        {this.props.user.name}
      </div>
    )
  }
}
