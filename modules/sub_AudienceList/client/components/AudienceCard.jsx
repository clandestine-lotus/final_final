import React, {Component} from 'react';

export default class AudienceCard extends Component{
  
  render() {
    const style = { height: '50px'}
    return (
      <div>
        <img style={style} src={this.props.user.picture}/>
        {this.props.user.name}
      </div>
    )
  }
}
